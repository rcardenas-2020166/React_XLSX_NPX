//Importación de Librerías//
import React from 'react'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';

//Componentes de Bootstrap//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//Importación de Componentes//
import { TableData } from '../TableData/TableData';

//Extensiones Válidas//
const extensionXLSX = 
[
  'xlsx', 'xlsm', 'xlsb', 'xls' ,'xla', 
  'biff8', 'biff5', 'biff2', 'xlml', 
  'ods', 'fods', 'csv', 'txt', 'sylk', 
  'slk', 'html', 'dif', 'rtf', 'prn', 
  'eth','dbf'
]

//Alertas de Extensiones//
const alertValidExtension = () =>
{
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Archivo Cargado Correctamente',
    showConfirmButton: false,
    timer: 1500
  })
}

const alertNotValidExtension = ()=> 
{
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Error en la Extensión del Archivo',
    showConfirmButton: false,
    timer: 1500
  })
}



class GetDataFromExcelJusTInput extends React.Component 
{
  
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      hoja: "",
      hojas:[],
      file: false,
      show: false
    };

    this.handleInputChange = this.handleInputChange.bind(this)

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    

  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  //Valida las Extensiones//
  validExtension (extension)
  {
    for (let existExtension of extensionXLSX)
    {

      if(existExtension === extension)
      {
        alertValidExtension();
      }
      else
      {
        alertNotValidExtension();
      }
      break;
    }
  }

  //Captura el evento y Obtiene la Data//
  handleInputChange (event) 
  {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const this2 = this
    this.setState({
      [name]: value
    })
    let splitFile = value.split('.')
    this.validExtension(splitFile[1])
    let hojas = []
    let dataArchivo;
    let encabezados;
    if (name === 'file') {
      let reader = new FileReader()
      reader.readAsArrayBuffer(target.files[0])
      reader.onloadend = (e) => 
      {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});

        workbook.SheetNames.forEach(function(sheetName) {
          //Objeto Entero//
          let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          });
          //Obtener los Datos//
          dataArchivo = hojas[0].data
          console.table(dataArchivo)
          encabezados = Object.keys(hojas[0].data[1]);
          let value = encabezados.length;
          TableData({dataArchivo, encabezados, value})
          //Obtener Encabezados//
          for(let column of encabezados)
          {
            console.table(column)
          }
        })
        this2.setState({
          selectedFileDocument: target.files[0],
          hojas
        })
        
      }
    }
  } 


  render() {
    const {
      handleInputChange
    } = this 
    return (
      
      <>
      <Button onClick={this.showModal} className='btn-labeled mb-5' variant="success">
          <span className='btn-label'>
              <i className="fa fa-file-excel"></i>
          </span>
          Excel
      </Button>
 

      <Modal show={this.state.show} onHide={this.hideModal} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
            <Modal.Title>
                <i className="fa fa-file-excel"></i> &nbsp;
                  Subir Archivo
            </Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <input className="form-control"
              required 
              type="file" 
              name="file" 
              id="file" 
              onChange={handleInputChange} 
              placeholder="Archivo de excel" 
            />
          </Modal.Body>
                <Modal.Footer className='spacing-buttons'>
                <Button onClick={this.hideModal} variant="danger">
                    <i className="fa-solid fa-circle-xmark"></i>&nbsp;
                    Cancelar
                </Button>
                <Button variant="success" >
                    <i className="fa-solid fa-circle-check"></i>&nbsp;
                    Subir Archivo
                </Button>
                </Modal.Footer>
            </Modal>
      </> 
    );
  }
}

export default GetDataFromExcelJusTInput