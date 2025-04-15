import React, { useState, useEffect } from "react";
import "../styles/User.css";

const UserModal = ({ onClose, onSave, usuarioEdit }) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (usuarioEdit) {
      setUsuario({
        nombre: usuarioEdit.nombre || "",
        email: usuarioEdit.email || "",
        password: "", // No cargar hash, se deja vacío
      });
    } else {
      setUsuario({ nombre: "", email: "", password: "" });
    }
  }, [usuarioEdit]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Solo enviar la contraseña si fue modificada
    const dataToSend = {
      nombre: usuario.nombre,
      email: usuario.email,
    };

    if (usuario.password.trim()) {
      dataToSend.password = usuario.password;
    }

    if (usuarioEdit?.id) {
      dataToSend.id = usuarioEdit.id;
    }

    onSave(dataToSend);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h3>{usuarioEdit ? "Editar Usuario" : "Agregar Usuario"}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={usuario.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={usuario.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={
                usuarioEdit ? "Nueva contraseña (opcional)" : "Contraseña"
              }
              value={usuario.password}
              onChange={handleChange}
              required={!usuarioEdit} // Solo requerido si es nuevo usuario
            />
            <div className="modal-buttons">
              <button type="submit" className="save-btn">Guardar</button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
