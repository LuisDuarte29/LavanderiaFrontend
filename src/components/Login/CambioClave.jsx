import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import { toast } from "react-toastify";

export default function CambioClave() {
  const { show, setShow, Usuario } = useContext(ServicesContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const URL_API = "https://localhost:7184/api/Autenticacion/CambioClave";
  const handleClose = () => setShow(false);

  const handleSaveChanges = async () => {
    if (newPassword !== confirmPassword) {
      toast("Las contraseñas no coinciden");
      return;
    }
    console.log("Usuario:", Usuario);
    console.log("Contraseña actual:", password);
    console.log("Nueva contraseña:", newPassword);
    const tokenRecibido = localStorage.getItem("token");
    const response = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenRecibido}`,
      },
      body: JSON.stringify({
        nuevaClave: newPassword,
        correo: Usuario,
        claveActual: password,
      }),
    });
    if (response.ok) {
      toast("Contraseña cambiada con éxito");
      handleClose();
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* Cabecera con fondo primario y texto blanco */}
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="mb-0">Cambio de Contraseña</Modal.Title>
      </Modal.Header>

      {/* Cuerpo con recuadro gris claro, borde redondeado y padding */}
      <Modal.Body className="bg-light border rounded p-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña actual"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña Nueva</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-0">
            <Form.Label>Confirme su nueva contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirme su nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Footer con botones alineados a la derecha por defecto */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
