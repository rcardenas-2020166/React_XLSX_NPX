//Hooks//

//Props//
import PropTypes from 'prop-types';

//Componentes de Bootstrap//
import Table from 'react-bootstrap/Table';

//Importar Componentes//
export const TableData = ({ data, encabezados }) => {

    return (
        <>
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
                    <tr>
                        <td>3</td>
                        <td>Rodrigo</td>
                        <td>Cárdenas</td>
                        <td>rcardenas</td>
                    </tr>


                </tbody>
            </Table>
        </>
    )
}

TableData.propTypes =
{
    value: PropTypes.number.isRequired,
}

TableData.defaultProps =
{
    value: 0,
}