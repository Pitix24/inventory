import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import {
  FiHome,
  FiBox,
  FiTag,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import logo from "../../../assets/img/logo.jpg"; // Imagen del logo

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsSidebarOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* 🟢 Botón flotante separado del menú */}
      <button className="menu-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* 🔵 Sidebar Principal */}
      <div className={`sidebar ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        {/* ✅ Logo o texto de "Inventario" */}
        <div className="sidebar-header">
          {isSidebarOpen ? (
            <h2>Inventario</h2>
          ) : (
            <img src={logo} alt="Logo" className="sidebar-logo" />
          )}
        </div>

        {/* ✅ Información del usuario */}
        <div className="user-info">
          {isSidebarOpen && (
            <p>
              Bienvenido, <strong>{userName || "Usuario"}</strong>
            </p>
          )}
        </div>

        {/* ✅ Menú de navegación */}
        <nav className="sidebar-menu">
          <ul>
            <li className={`menu-item ${isSidebarOpen ? "expanded" : "collapsed"}`}>
              <Link to="/" onClick={() => setIsSidebarOpen(false)} className="menu-link">
                <FiHome className="icon" />
                {isSidebarOpen && <span className="menu-text">Inicio</span>}
              </Link>
            </li>

            <li className={`menu-item ${isSidebarOpen ? "expanded" : "collapsed"}`}>
              <Link to="/productos" onClick={() => setIsSidebarOpen(false)} className="menu-link">
                <FiBox className="icon" />
                {isSidebarOpen && <span className="menu-text">Productos</span>}
              </Link>
            </li>

            <li className={`menu-item ${isSidebarOpen ? "expanded" : "collapsed"}`}>
              <Link to="/categorias" onClick={() => setIsSidebarOpen(false)} className="menu-link">
                <FiTag className="icon" />
                {isSidebarOpen && <span className="menu-text">Categorías</span>}
              </Link>
            </li>

            <li className={`menu-item ${isSidebarOpen ? "expanded" : "collapsed"}`}>
              <Link to="/usuarios" onClick={() => setIsSidebarOpen(false)} className="menu-link">
                <FiUsers className="icon" />
                {isSidebarOpen && <span className="menu-text">Usuarios</span>}
              </Link>
            </li>
          </ul>
        </nav>

        {/* ✅ Botón de Cerrar Sesión */}
        <div className="logout-container">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="icon" />
            {isSidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
