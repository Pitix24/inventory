import React, { useState, useEffect } from "react";
import "../styles/components/ProductModal.css"; // Reutilizando el modal de producto para consistencia visual

const CategoryModal = ({ onClose, onSave, categoriaEdit }) => {
  const [categoria, setCategoria] = useState({
    id: null,
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    if (categoriaEdit) {
      setCategoria({
        id: categoriaEdit.id || null,
        nombre: categoriaEdit.nombre || "",
        descripcion: categoriaEdit.descripcion || "",
      });
    } else {
      setCategoria({ id: null, nombre: "", descripcion: "" });
    }
  }, [categoriaEdit]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(categoria);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{categoria.id ? "Editar Categoría" : "Agregar Categoría"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la categoría"
            value={categoria.nombre}
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={categoria.descripcion}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Guardar
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
