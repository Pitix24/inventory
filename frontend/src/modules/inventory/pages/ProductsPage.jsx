import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ProductModal from "../components/ProductModal";
import Header from "../components/componentsSimple/Header";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/api";
import "../styles/products.css";

const ProductsPage = () => {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await getProductos();
    setProductos(res.data);
  };
  

  const handleSave = async (producto) => {
    if (producto.get && producto.get("id")) {
      await updateProducto(producto.get("id"), producto);
    } else {
      await createProducto(producto);
    }
    fetchProductos();
    setOpenModal(false);
    setProductoEdit(null);
  };
  
  const handleEditProducto = (producto) => {
    setProductoEdit(producto);
    setOpenModal(true); // <- Asegúrate de abrir el modal
  };
  
  const handleDeleteProducto = async (id) => {
    await deleteProducto(id);
    fetchProductos(); // Refrescar la lista
  };

  // Filtrar productos en tiempo real
  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="product-wrapper">
        {/* 🔵 Header reutilizable */}
        <Header
          title="Gestión de Productos"
          subtitle={`Total: ${productos.length} productos`}
          searchPlaceholder="Buscar productos..."
          onSearch={setSearchTerm}
          onAdd={() => {
            setProductoEdit(null);
            setOpenModal(true);
          }}
        />

        {/* 📋 Lista de productos */}
        <ProductList
          productos={filteredProductos}
          onEdit={handleEditProducto}
          onDelete={handleDeleteProducto}
        />

        {/* 🛠 Modal de edición / creación */}
        {openModal && (
          <ProductModal
            onClose={() => setOpenModal(false)}
            onSave={handleSave}
            productoEdit={productoEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
