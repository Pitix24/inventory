import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import InputField from '../components/formComponents/InputField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            navigate('/');
            
        } catch (error) {
            toast.error(`Error en las credenciales: ${error.response?.data?.message || "Intenta nuevamente."}`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <InputField label="Correo" type="email" name="Email" id="Email" value={email} onChange={setEmail} />
                    <InputField label="Contraseña" type="password" name="Password" id="Password" value={password} onChange={setPassword} />
                    <button type="submit" className="login-btn">Iniciar Sesión</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
