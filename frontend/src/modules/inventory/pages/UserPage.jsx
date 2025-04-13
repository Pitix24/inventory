import React, { useState, useEffect } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../services/api";
import UserList from "../components/UserList";
import UserModal from "../components/UserModal";
import Header from "../components/componentsSimple/Header";
import "../styles/User.css";

const UserPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const res = await getUsuarios();
    setUsuarios(res.data);
  };

  const handleSave = async (usuario) => {
    if (usuario.id) {
      await updateUsuario(usuario.id, usuario);
    } else {
      await createUsuario(usuario);
    }
    fetchUsuarios();
    setOpenModal(false);
    setUsuarioEdit(null);
  };

  const handleEditUsuario = (usuario) => {
    setUsuarioEdit(usuario);
    setOpenModal(true);
  };

  const handleDeleteUsuario = async (id) => {
    await deleteUsuario(id);
    setUsuarios((prev) => prev.filter((u) => u.id !== id)); // ❌ Eliminar sin recargar
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-wrapper">
        <Header
          title="Gestión de Usuarios"
          subtitle={`Total: ${usuarios.length} usuarios`}
          searchPlaceholder="Buscar usuarios"
          onSearch={setSearchTerm}
          onAdd={() => {
            setUsuarioEdit(null);
            setOpenModal(true);
          }}
        />

        <UserList
          usuarios={filteredUsuarios}
          onEdit={handleEditUsuario}
          onDelete={handleDeleteUsuario}
        />

        {openModal && (
          <UserModal
            onClose={() => setOpenModal(false)}
            onSave={handleSave}
            usuarioEdit={usuarioEdit}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
