import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./modules/inventory/components/SideBar";
import { PrivateRoutes, PublicRoutes } from "./routers/routes.jsx";
import "./App.css";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
}

function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    // Verifica si la ruta actual es pública (como "/login")
    const isPublicRoute = PublicRoutes.some(route => route.path === location.pathname);

    return (
        <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            {/* Renderiza el Sidebar SOLO si la ruta NO es pública */}
            {!isPublicRoute && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

            <div className="main-content">
                <Routes>
                    {PublicRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={element} />
                    ))}

                    <Route path="/*" element={
                        <PrivateRoute>
                            <div className="content-container">
                                <Routes>
                                    {PrivateRoutes.map(({ path, element }) => (
                                        <Route key={path} path={path} element={element} />
                                    ))}
                                </Routes>
                            </div>
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
