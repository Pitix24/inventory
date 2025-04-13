import React, { useEffect, useState } from "react";
import { getProductos, getCategorias, getUsuarios } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const HomePage = ({ isSidebarOpen }) => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [resumenPorCategoria, setResumenPorCategoria] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const resProductos = await getProductos();
    const resCategorias = await getCategorias();
    const resUsuarios = await getUsuarios();

    const productos = resProductos.data;
    const categorias = resCategorias.data;
    const usuarios = resUsuarios.data;

    setTotalProductos(productos.length);
    setTotalCategorias(categorias.length);
    setTotalUsuarios(usuarios.length);

    const conteo = categorias.map((cat) => {
      const cantidad = productos.filter((p) => p.categoria_id === cat.id).length;
      return {
        nombre: cat.nombre,
        cantidad,
      };
    });

    setResumenPorCategoria(conteo);
  };

  return (
    <div className={`home-container ${isSidebarOpen ? "shrink" : ""}`}>
      <div className="home-content">
        <h2 className="home-title">Resumen del Inventario</h2>

        <div className="summary-section">
          <div className="summary-card" onClick={() => navigate("/productos")}>
            <h3>Total de Productos</h3>
            <p className="product-count">{totalProductos}</p>
          </div>

          <div className="summary-card" onClick={() => navigate("/categorias")}>
            <h3>Total de Categorías</h3>
            <p className="product-count">{totalCategorias}</p>
          </div>

          <div className="summary-card" onClick={() => navigate("/usuarios")}>
            <h3>Total de Usuarios</h3>
            <p className="product-count">{totalUsuarios}</p>
          </div>
          {resumenPorCategoria.length > 0 && (
          <div className="summary-card full-width">
            <h3 style={{ marginBottom: "1rem" }}>📦 Productos por Categoría</h3>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {resumenPorCategoria.map((item, index) => (
                <li key={index} style={{ marginBottom: "8px", fontSize: "1rem", textAlign: "left" }}>
                  🔹 <strong>{item.nombre}</strong>: {item.cantidad} producto(s)
                </li>
              ))}
            </ul>
          </div>
        )}
        </div>

        {/* 🟣 Resumen por Categoría (sin gráfico) */}
       
      </div>
    </div>
  );
};

export default HomePage;
