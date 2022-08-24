//CSS//
import './PrincipalView.css'

//Importar Componentes//
import { TableData } from '../TableData/TableData';
import ImportInput from '../ImportInput/ImportInput';

export const PrincipalView = () => 
{
    return (
        <>
            <h1>Excel a Data <code>json</code></h1>
            <hr className='mb-5' />
            <ImportInput />
            <TableData />
        </>
    )
}
