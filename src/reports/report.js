
//Hooks//
import { useState } from 'react';
import { useEffect } from 'react';

//Componentes de Bootstrap//
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

//Librerías externas//
import XLSX  from 'xlsx';
import Swal from 'sweetalert2'


//CSS//
import './report.css'

//Librería//

export const ReportApp = () => 
{
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const mostrarAlerta = () => 
    {
        Swal.fire
        (
            'Good job!',
            'You clicked the button!',
            'success'
        )
    }
    return (
        <>
        
            <h1>Excel a Data <code>json</code></h1>
            <hr className='mb-5' />
            <Button onClick={handleShow} className='btn-labeled mb-5' variant="success">
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
            <Modal aria-labelledby="contained-modal-title-vcenter"
                    centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i class="fa fa-file-excel"></i> &nbsp;
                        Subir Archivo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" className='form-control'/>
                </Modal.Body>
                <Modal.Footer className='spacing-buttons'>
                <Button variant="danger" onClick={handleClose}>
                    <i class="fa-solid fa-circle-xmark"></i>&nbsp;
                    Cancelar
                </Button>
                <Button variant="success" onClick={() => {handleClose(); mostrarAlerta()}}>
                    <i class="fa-solid fa-circle-check"></i>&nbsp;
                    Subir Archivo
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
