import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import CategoryModal from "../components/CategoryModal";
import Header from "../components/componentsSimple/Header";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../services/api";
import "../styles/Categories.css";

const CategoriesPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    const res = await getCategorias();
    setCategorias(res.data);
  };

  const handleSave = async (categoria) => {
    if (categoria.id) {
      await updateCategoria(categoria.id, categoria);
    } else {
      await createCategoria(categoria);
    }
    fetchCategorias();
    setOpenModal(false);
    setCategoriaEdit(null);
  };

  const handleEdit = (categoria) => {
    setCategoriaEdit(categoria);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    await deleteCategoria(id);
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  };

  // 🟡 Filtro en tiempo real
  const filteredCategorias = categorias.filter((cat) =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories-container">
      <div className="categories-wrapper">
        <Header
          title="Gestión de Categorías"
          subtitle={`Total: ${categorias.length} categorías`}
          searchPlaceholder="Buscar categoría"
          onSearch={setSearchTerm}
          onAdd={() => {
            setCategoriaEdit(null);
            setOpenModal(true);
          }}
        />

        <CategoryList
          categorias={filteredCategorias}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {openModal && (
          <CategoryModal
            onClose={() => setOpenModal(false)}
            onSave={handleSave}
            categoriaEdit={categoriaEdit}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
