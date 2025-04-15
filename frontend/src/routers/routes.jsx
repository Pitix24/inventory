import HomePage from "../modules/inventory/pages/HomePage";
import ProductsPage from "../modules/inventory/pages/ProductsPage";
import CategoriesPage from "../modules/inventory/pages/CategoriesPage";
import UserPage from "../modules/inventory/pages/UserPage";
import LoginPage from "../modules/inventory/pages/LoginPage";

export const PrivateRoutes = [
    { path: "/", element: <HomePage /> },
    { path: "/productos", element: <ProductsPage /> },
    { path: "/categorias", element: <CategoriesPage /> },
    { path: "/usuarios", element: <UserPage /> },
];

export const PublicRoutes = [
    { path: "/login", element: <LoginPage /> }
];
