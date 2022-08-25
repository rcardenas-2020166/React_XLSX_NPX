//CSS//
import './PrincipalView.css'

//Importar Componentes//
import ImportInput from '../ImportInput/ImportInput';

export const PrincipalView = () => 
{
    return (
        <>
            <h1>Excel a <code>Data</code></h1>
            <hr className='mb-5' />
            <ImportInput />
        </>
    )
}
