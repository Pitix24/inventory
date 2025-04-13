require('dotenv').config(); // 👈 Esto carga las variables del .env
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const SECRET_KEY = process.env.JWT_SECRET || 'secreto_super_seguro';

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("🧪 Email:", email);
        console.log("🧪 Password ingresada:", password);
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        console.log("🔍 Usuario encontrado:", usuario.nombre);
        console.log("🔐 Hash guardado:", usuario.password);
        const validPassword = await bcrypt.compare(password, usuario.password);
        console.log("✅ ¿Contraseña válida?:", validPassword);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, { expiresIn: '2h' });

        res.json({
            token,
            user: { id: usuario.id, name: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};


module.exports = { login };
