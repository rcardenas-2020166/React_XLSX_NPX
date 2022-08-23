//Importación de Librerías//
import React from 'react'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';

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
      file: false
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }

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
        <input className="form-control"
            required 
            type="file" 
            name="file" 
            id="file" 
            onChange={handleInputChange} 
            placeholder="Archivo de excel" 
        />
      </> 
    );
  }
}

export default GetDataFromExcelJusTInput