import React from "react";
import DataTable from "../components/componentsSimple/DataTable";

const CategoryList = ({ categorias, onEdit, onDelete }) => {
  const columns = [
    {
      label: "Nombre",
      key: "nombre",
      render: (cat) => (
        <span className="truncate">{cat.nombre}</span>
      )
    },
    {
      label: "Descripción",
      key: "descripcion",
      render: (cat) => (
        <span className="truncate">{cat.descripcion}</span>
      )
    },
  ];

  const actions = [
    {
      label: "Editar",
      className: "edit-btn",
      onClick: (categoria) => onEdit(categoria),
    },
    {
      label: "Eliminar",
      className: "delete-btn",
      onClick: (categoria) => onDelete(categoria.id),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={categorias}
      actions={actions}
    />
  );
};

export default CategoryList;
