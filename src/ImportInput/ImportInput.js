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
      show: false,
      dataExist: [],
      encabezados: [],
      nameFile: '',
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
  validExtension (extension, value)
  {
    for (let existExtension of extensionXLSX)
    {
      let validFile = value.split('\\');
      validFile = validFile[2]
      if(existExtension === extension)
      {
    
        alertValidExtension();
        this.setState({
          nameFile: validFile
        })
      }
      else
      {
        alertNotValidExtension();
        this.setState({
          nameFile: ''
        })
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
    this.validExtension(splitFile[1], value)
    let hojas = []
    let dataArchivo = [];
    let encabezados = [];

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
          //Obtener los Encabezados//}
          for(let encabezado of Object.keys(hojas[0].data[1]))
          {
            encabezados.push(encabezado)
          }
          //Obtener Data//
          for(let data of hojas[0].data)
          {
            let index = hojas[0].data.indexOf(data)
            let value = Object.values(hojas[0].data[index])
            dataArchivo.push(value)
          }
        })
        this2.setState({
          selectedFileDocument: target.files[0],
          hojas
        })
      }
      this.setState({
        dataExist: dataArchivo,
        encabezados: encabezados,
      })
    }
    this.hideModal();
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
          
          <TableData data={this.state.dataExist} encabezados={this.state.encabezados} archivo={this.state.nameFile}/>

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
          </Modal>
      </> 
    );
  }
}

export default GetDataFromExcelJusTInput