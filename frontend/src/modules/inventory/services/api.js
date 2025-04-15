import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Obtener el token desde localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Productos
export const getProductos = () => axios.get(`${API_URL}/productos`, { headers: getAuthHeader() });
export const createProducto = (data) => axios.post(`${API_URL}/productos`, data, { headers: getAuthHeader() });
export const updateProducto = (id, data) => axios.put(`${API_URL}/productos/${id}`, data, { headers: getAuthHeader() });
export const deleteProducto = (id) => axios.delete(`${API_URL}/productos/${id}`, { headers: getAuthHeader() });

// Categorías
export const getCategorias = () => axios.get(`${API_URL}/categorias`, { headers: getAuthHeader() });
export const createCategoria = (data) => axios.post(`${API_URL}/categorias`, data, { headers: getAuthHeader() });
export const updateCategoria = (id, data) => axios.put(`${API_URL}/categorias/${id}`, data, { headers: getAuthHeader() });
export const deleteCategoria = (id) => axios.delete(`${API_URL}/categorias/${id}`, { headers: getAuthHeader() });

// Usuarios
export const getUsuarios = () => axios.get(`${API_URL}/usuarios`, { headers: getAuthHeader() });
export const createUsuario = (data) => axios.post(`${API_URL}/usuarios`, data, { headers: getAuthHeader() });
export const updateUsuario = (id, data) => axios.put(`${API_URL}/usuarios/${id}`, data, { headers: getAuthHeader() });
export const deleteUsuario = (id) => axios.delete(`${API_URL}/usuarios/${id}`, { headers: getAuthHeader() });

// Autenticación
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);