import React, { useState, useEffect } from "react";
import "../styles/components/ProductModal.css";
import { getCategorias } from "../services/api";

const ProductModal = ({ onClose, onSave, productoEdit }) => {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    marca: "",
    categoria_id: "",
    imagen_url: "", // Aquí se almacena la imagen en Base64
  });

  const [categorias, setCategorias] = useState([]); // Estado para categorías

  useEffect(() => {
    fetchCategorias(); // Cargar categorías al abrir el modal

    if (productoEdit) {
      setProducto({
        id: productoEdit.id || null,
        nombre: productoEdit.nombre || "",
        descripcion: productoEdit.descripcion || "",
        precio: productoEdit.precio || "",
        stock: productoEdit.stock || "",
        marca: productoEdit.marca || "",
        categoria_id: productoEdit.categoria_id || "",
        imagen_url: productoEdit.imagen_url || "",
        imagenPreview: "",
        imagen: null,
      });
    } else {
      setProducto({
        id: null,
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        marca: "",
        categoria_id: "",
        imagen_url: "",
        imagenPreview: "",
        imagen: null,
      });
    }
  }, [productoEdit]);

  // 🟢 Obtener las categorías desde la API
  const fetchCategorias = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res.data); // Guardar categorías en el estado
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("descripcion", producto.descripcion);
    formData.append("precio", producto.precio);
    formData.append("stock", producto.stock);
    formData.append("marca", producto.marca);
    formData.append("categoria_id", producto.categoria_id);

    // 📌 Solo agregar la imagen si se ha seleccionado una
    if (producto.imagen) {
      formData.append("imagen", producto.imagen);
    }

    if (producto.id) {
      formData.append("id", producto.id);
    }

    onSave(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProducto((prev) => ({
        ...prev,
        imagen: file, // Guardar archivo en vez de Base64
        imagenPreview: previewUrl,
      }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{producto.id ? "Editar Producto" : "Agregar Producto"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del producto"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={producto.precio}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={producto.stock}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={producto.marca}
            onChange={handleChange}
            required
          />

          {/* 🔵 Select de Categorías dinámico */}
          <select
            name="categoria_id"
            value={producto.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

          {/* 🟠 Subida de Imagen */}
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {/* 🖼️ Previsualización de la imagen */}
          {producto.imagenPreview ? (
            <div className="image-preview">
              <img src={producto.imagenPreview} alt="Vista previa" />
            </div>
          ) : producto.imagen_url ? (
            <div className="image-preview">
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${producto.imagen_url}`}
                alt="Producto guardado"
              />
            </div>
          ) : null}

          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Guardar
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
