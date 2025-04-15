import React from "react";
import DataTable from "../components/componentsSimple/DataTable";

const UserList = ({ usuarios, onEdit, onDelete }) => {
  const columns = [
    { label: "Nombre", key: "nombre" },
    { label: "Email", key: "email" },
  ];

  const actions = [
    {
      label: "Editar",
      className: "edit-btn",
      onClick: (usuario) => onEdit(usuario),
    },
    {
      label: "Eliminar",
      className: "delete-btn",
      onClick: (usuario) => onDelete(usuario.id),
    },
  ];

  return <DataTable columns={columns} data={usuarios} actions={actions} itemsPerPage={5} />;
};

export default UserList;
