import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { ServicesContext } from "../../context/ServicesContext";

export default function CambioClave() {
  const { show, setShow } = useContext(ServicesContext);
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambio de Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Aquí tu formulario para cambio de clave */}
        Contenido del formulario...
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}