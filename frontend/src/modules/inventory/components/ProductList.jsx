import React from "react";
import DataTable from "../components/componentsSimple/DataTable";


const ProductList = ({ productos, onEdit, onDelete }) => {
  const columns = [
    { 
      label: "Imagen", 
      key: "imagen_url", 
      render: (producto) => {
        if (!producto.imagen_url) return "Sin imagen";

        const isBase64 = /^data:image\/(png|jpeg|jpg|gif);base64,/.test(producto.imagen_url);
        const imageUrl = isBase64 
          ? producto.imagen_url 
          : `${import.meta.env.VITE_API_URL}/uploads/${producto.imagen_url}`;

        return (
          <img 
            src={imageUrl} 
            alt={producto.nombre || "Imagen del producto"} 
            className="product-image" 
            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
            onError={(e) => e.target.src = "/placeholder.png"} // Imagen de respaldo si hay error
          />
        );
      }
    },
    { label: "Nombre", key: "nombre" },
    { label: "Descripción", key: "descripcion"},
    { label: "Precio", key: "precio" },
    { label: "Stock", key: "stock" },
    {
      label: "Marca",
      key: "marca",
      render: (producto) => producto.marca || "Sin marca",
    },
    { 
      label: "Categoria", 
      key: "categoria_id", 
      render: (producto) => producto.Categoria ? producto.Categoria.nombre : "Sin categoría"
    }
  ];

  const actions = [
    {
      label: "Editar",
      className: "edit-btn",
      onClick: (producto) => onEdit(producto),
    },
    {
      label: "Eliminar",
      className: "delete-btn",
      onClick: (producto) => onDelete(producto.id),
    },
  ];

  return <DataTable columns={columns} data={productos} actions={actions} />;
};

export default ProductList;
