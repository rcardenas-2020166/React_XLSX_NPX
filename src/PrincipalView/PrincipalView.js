
//Hooks//
import { useState } from 'react';

//Componentes de Bootstrap//
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//CSS//
import './PrincipalView.css'

//Importar Componentes//
import ImportInput from '../ImportInput/ImportInput';
import { TableData } from '../TableData/TableData';

export const PrincipalView = () => 
{
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

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
            <TableData />
            <Modal aria-labelledby="contained-modal-title-vcenter"
                    centered show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-file-excel"></i> &nbsp;
                        Subir Archivo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ImportInput />
                </Modal.Body>
                <Modal.Footer className='spacing-buttons'>
                <Button variant="danger" onClick={handleClose}>
                    <i className="fa-solid fa-circle-xmark"></i>&nbsp;
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleClose}>
                    <i className="fa-solid fa-circle-check"></i>&nbsp;
                    Subir Archivo
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
