import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
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
    <Modal className="mt-5" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambio de Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Contraseña Actual</p>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Ingrese su contraseña actual"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Contraseña Nueva</p>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Ingrese su nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p>Confirme su nueva contraseña</p>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirme su nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Modal.Body>
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
