//Hooks//

//Props//
import PropTypes from 'prop-types';

//Componentes de Bootstrap//
import Table from 'react-bootstrap/Table';

//Importar Componentes//
export const TableData = (props) => 
{
    return (
        <>
            <h1>{props.archivo}</h1>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        { props.encabezados.map(encabezado =>
                            <th key={encabezado}>{`${encabezado}`}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>  
                    { props.data.map(valueData =>
                        <tr key={valueData}>
                            {valueData.map(value =>
                                <td key={value}>{`${value}`}</td>
                            )
                            }
                        </tr>
                    )  
                    }
                </tbody>
            </Table>
        </>
    )
}
