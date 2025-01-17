const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Ruta para el registro de usuarios


// Ruta para el inicio de sesión de usuarios
router.post('/login', async(req, res) => {
    const { usuario, contraseña } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario o contraseña incorrectos.' });
        }
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(contraseña, user.contraseña);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
        }
        if(!user.habilitado){
            return res.status(401).json({ message: 'Usuario inhabilitado.' });
        }
        const esAdmin = user.esAdmin;
        const esDirector = user.esDirector;
        const usuarioId = user.id;
        const token = jwt.sign({ id: user.id, usuario: user.usuario, esDirector: user.esDirector, esAdmin: user.esAdmin }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, esAdmin, esDirector, usuarioId });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

// Ruta protegida de ejemplo
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso autorizado' });
});

module.exports = router; // Exportar el router