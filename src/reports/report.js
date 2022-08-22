
//Hooks//
import { useState } from 'react';
import { useEffect } from 'react';

//Componentes de Bootstrap//
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

//Librerías externas//
import * as XLSX  from 'xlsx';
import Swal from 'sweetalert2'


//CSS//
import './report.css'

//Librería//

export class ReportApp extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          hoja: "",
          hojas:[],
          file: false
        };
    
        this.handleInputChange = this.handleInputChange.bind(this)
      }

    render()
    {


    const mostrarAlerta = () => 
    {
        Swal.fire
        (
            'Good job!',
            'You clicked the button!',
            'success'
        )
    }


    //Input de Archivos - Function//
    const handleInputChange = (event) => 
    {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        const this2 = this
        this.setStateExcel({
          [name]: value
        })
        let hojas = []
        if (name === 'file') {
          let reader = new FileReader()
          reader.readAsArrayBuffer(target.files[0])
          reader.onloadend = (e) => {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {type: 'array'});
    
            workbook.SheetNames.forEach(function(sheetName) {
              // Here is your object
              let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              hojas.push({
                data: XL_row_object,
                sheetName
              })
            })
            this2.setStateExcel({
              selectedFileDocument: target.files[0],
              hojas
            })
          }
        }
      } 

    return (
        <>
        
            <h1>Excel a Data <code>json</code></h1>
            <hr className='mb-5' />
            <Button  className='btn-labeled mb-5' variant="success">
                <span className='btn-label'>
                    <i className="fa fa-file-excel"></i>
                </span>
                Excel
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                </tbody>
            </Table>
            
        </>
    )
    }
}
