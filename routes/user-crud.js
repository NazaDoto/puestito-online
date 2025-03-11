const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

// Obtener todos los usuarios
router.get('/usuarios', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});
router.get('/nombreUser', async(req,res) =>{
    const userId = req.query.userId;
    try {
        const response = await db.query('SELECT descripcion FROM usuarios WHERE id = ?', [userId]);
        res.json(response);
    } catch (error) {
        console.error(error);
    }
})
router.get('/areaUser', async(req, res) => {
    const userId = req.query.userId;
    try {
        const [result] = await db.query('SELECT id_area, id_direccion from usuarios WHERE id = ?', [userId]);
        try {
            const [result2] = await db.query(
                `
                SELECT a.descripcion AS area, d.descripcion AS direccion
                FROM areas a
                JOIN direcciones d ON a.id_direccion = d.id
                WHERE a.id = ? AND d.id = ?
                `,
                [result[0].id_area, result[0].id_direccion]
            );
                        res.json(result2)
        } catch (error) {
            console.error('Error. ' + error);
        res.status(500).json({message: 'Error al obtener area del usuario'});
        }
    } catch (error){
        console.error('Error. ' + error);
        res.status(500).json({message: 'Error al obtener area del usuario'});
    }
})

// Obtener numero de telefono
router.get('/wpp/:user', async(req,res) => {
    const { user } = req.params;
    try {
        const [result] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [user]);
        res.json(result[0].telefono);
    } catch (error){
        console.log(error);
    }
})
// Crear un nuevo usuario
router.post('/nuevaUsuario', async(req, res) => {
    const { nombre, mail, telefono, direccion, area, subarea, usuario, contraseña, esDirector, esAdmin } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const [result] = await db.query('INSERT INTO usuarios (nombre, mail, telefono, id_direccion, id_area, id_subarea, usuario, contraseña, esDirector, esAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, mail, telefono, direccion, area, subarea, usuario, hashedPassword, esDirector, esAdmin]);
        const newUsuario = {
            id: result.insertId,
            nombre,
            mail,
            telefono,
            direccion,
            area,
            subarea,
            usuario,
            esDirector,
            esAdmin
        };
        res.status(201).json(newUsuario);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
});

// Modificar un usuario existente
router.put('/modificarUsuario/:id', async(req, res) => {
    const { id } = req.params;
    const { nombre, mail, telefono, direccion, area, usuario, contraseña, esDirector, esAdmin } = req.body;
    try {
        const hashedPassword = contraseña ? await bcrypt.hash(contraseña, 10) : null;
        const updateUserQuery = hashedPassword ?
            'UPDATE usuarios SET nombre = ?, mail = ?, telefono = ?, id_direccion = ?, id_area = ?, usuario = ?, contraseña = ?, esDirector = ?, esAdmin = ? WHERE id = ?' :
            'UPDATE usuarios SET nombre = ?, mail = ?, telefono = ?, id_direccion = ?, id_area = ?, usuario = ?, esDirector = ?, esAdmin = ? WHERE id = ?';
        const updateUserParams = hashedPassword ? [nombre, mail, telefono, direccion, area, usuario, hashedPassword, esDirector, esAdmin, id] : [nombre, mail, telefono, direccion, area, usuario, esDirector, esAdmin, id];

        await db.query(updateUserQuery, updateUserParams);
        res.json({ message: 'Usuario modificado correctamente' });
    } catch (error) {
        console.error('Error al modificar usuario:', error);
        res.status(500).json({ message: 'Error al modificar usuario' });
    }
});

// Deshabilitar un usuario
router.put('/deshabilitarUsuario/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE usuarios SET habilitado = 0 WHERE id = ?', [id]);
        res.json({ message: 'Usuario deshabilitado correctamente' });
    } catch (error) {
        console.error('Error al deshabilitar usuario:', error);
        res.status(500).json({ message: 'Error al deshabilitar usuario' });
    }
});
// Habilitar un usuario
router.put('/habilitarUsuario/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await db.query('UPDATE usuarios SET habilitado = 1 WHERE id = ?', [id]);
        res.json({ message: 'Usuario habilitado correctamente' });
    } catch (error) {
        console.error('Error al habilitar usuario:', error);
        res.status(500).json({ message: 'Error al habilitar usuario' });
    }
});

module.exports = router; // Exportar el router