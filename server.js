const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const https = require('https')
const multer = require('multer');

const fs = require('fs')
const app = express();
const port = 3500;
// Middleware


const env = "dev";


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());

//app.use(express.ssl.Cert('./nazadoto.pem'));
if (env == 'dev') {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2112',
        database: 'menu'
    });
    connection.connect(err => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
        } else {
            console.log('Conexión exitosa a MySQL');
        }
    });
} else {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'naza_root',
        password: 'naza2112',
        database: 'naza_menu'
    });
    connection.connect(err => {
        if (err) {
            console.error('Error al conectar a MySQL:', err);
        } else {
            console.log('Conexión exitosa a MySQL');
        }
    });
}


const saltRounds = 10; // Número de rounds de salting
const secretKey = 'tu_clave_secreta'; // Cambia esto a una clave secreta segura

// Función para generar un token JWT
function generarToken(usuarioId) {
    const payload = { usuarioId };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expira en 1 hora
}

// Función para verificar si un usuario está autenticado mediante token JWT
function usuarioAutenticado(token) {
    //const token = req.headers.authorization;

    if (token) {
        return false;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return true;
    } catch (error) {
        return false;
    }
}




// Ruta para registrar un usuario



app.post('/register', (req, res) => {
    const { usuario, contraseña, nombre, fechaVence, email, telefono } = req.body;

    // Hashea la contraseña antes de almacenarla en la base de datos
    bcrypt.hash(contraseña, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ message: 'Error al registrar usuario' });
        } else {
            // Guarda el hash en la base de datos junto con el usuario
            const query = 'INSERT INTO usuarios (usuario_nombre, usuario_contraseña, usuario_nombre_negocio, usuario_fecha_vencimiento, usuario_correo, usuario_telefono) VALUES (?, ?, ?, ?, ?, ?)';
            connection.query(query, [usuario, hash, nombre, fechaVence, email, telefono], (err, result) => {
                if (err) {
                    console.error('Error al registrar usuario:', err);
                    res.status(500).json({ message: 'Error al registrar usuario' });
                } else {
                    res.status(200).json({ message: 'Usuario registrado exitosamente' });
                }
            });
        }
    });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;

    // Consulta el hash almacenado en la base de datos para el usuario
    const query = 'SELECT * FROM usuarios WHERE usuario_nombre = ?';
    connection.query(query, [usuario], (err, result) => {
        if (err) {
            console.error('Error al consultar usuario:', err);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        } else {
            if (result.length === 1) {
                const storedHash = result[0].usuario_contraseña;
                const usuarioId = result[0].usuario_id; // Cambia esto a la columna adecuada en tu tabla de usuarios
                const nombre = result[0].usuario_nombre_negocio; // Campo de nombre personal
                const nomUsuario = result[0].usuario_nombre;

                // Compara la contraseña ingresada con el hash almacenado
                bcrypt.compare(contraseña, storedHash, (err, result) => {
                    if (err) {
                        console.error('Error al comparar contraseñas:', err);
                        res.status(500).json({ message: 'Error al iniciar sesión' });
                    } else {
                        if (result) {
                            const token = generarToken(usuarioId); // Modifica la función generarToken para aceptar el nombre personal
                            res.status(200).json({ message: 'Inicio de sesión exitoso', token, nombre, nomUsuario });
                        } else {
                            res.status(401).json({ message: 'Credenciales inválidas' });
                        }
                    }
                });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        }
    });
});



//Cargar PRODUCTO

const uploadPath = './negocios';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
        const usuario = req.body.usuario;

        if (!usuario) {
            return cb(new Error('Usuario no especificado en el producto'), null);
        }

        const negocioFolder = `${uploadPath}/${usuario}`;
        fs.mkdirSync(negocioFolder, { recursive: true });
        cb(null, negocioFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/nuevoProducto', (req, res) => {
    try {
        const { producto } = req.body;

        // Realizar la inserción en la base de datos
        const sql = `
            INSERT INTO productos (producto_nombre, producto_descripcion, producto_categoria, producto_precio, producto_imagen, usuario_nombre)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const sqlSinImg = `
            INSERT INTO productos (producto_nombre, producto_descripcion, producto_categoria, producto_precio,  usuario_nombre)
            VALUES (?, ?, ?, ?, ?)
        `;

        if (producto.imagen == null) {
            const { producto } = req.body;
            connection.query(sqlSinImg, [
                producto.nombre,
                producto.descripcion,
                producto.categoria,
                producto.precio,
                producto.usuario
            ], (err, result) => {
                if (err) {
                    console.error('Error al modificar producto:', err);
                    res.status(500).json({ message: 'Error al modificar producto' });
                } else {
                    res.status(200).json({ message: 'Producto modificado exitosamente' });
                }
            });
        } else {

            const { producto } = req.body;
            connection.query(sql, [
                producto.nombre,
                producto.descripcion,
                producto.categoria,
                producto.precio,
                producto.imagen,
                producto.usuario
            ], (err, result) => {
                if (err) {
                    console.error('Error al modificar producto:', err);
                    res.status(500).json({ message: 'Error al modificar producto' });
                } else {
                    res.status(200).json({ message: 'Producto modificado exitosamente' });
                }
            });
        }
    } catch (error) {
        console.error('Error en la carga del producto:', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get(`/categorias`, (req, res) => {

    const usuario = req.query.usuario;
    // Realiza una consulta a la base de datos para obtener los informes

    connection.query('SELECT * FROM categorias WHERE usuario_nombre = ?', usuario, (err, results) => {
        if (err) {
            console.error("Error al obtener los informes:", err);
            res.status(500).json({ message: "Error al obtener los informes" });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/nuevaCategoria', (req, res) => {

    const {
        categoria_nombre,
        usuario_nombre
    } = req.body;
    const insertQuery = `
      INSERT INTO categorias
      (categoria_nombre, usuario_nombre) VALUES (?, ?)
    `;

    connection.query(
        insertQuery, [categoria_nombre, usuario_nombre],
        (err, result) => {
            if (err) {
                console.error('Error al insertar en la base de datos: ' + err.message);
                res.status(500).json({ error: 'Error al procesar la solicitud.' });
            } else {
                console.log('Registro insertado correctamente.');
                res.status(200).json({ message: 'Registro insertado correctamente.', categoria: categoria_nombre });
            }
        }
    );

});

app.get("/productos", (req, res) => {
    // Realiza una consulta a la base de datos para obtener los informes
    const usuario = req.query.usuario;
    const query = "SELECT * FROM productos WHERE usuario_nombre = ?"; // Ajusta la consulta según tu esquema de base de datos

    connection.query(query, usuario, (err, results) => {
        if (err) {
            console.error("Error al obtener los productos:", err);
            res.status(500).json({ message: "Error al obtener los productos" });
        } else {
            res.status(200).json(results);
        }
    });
});
app.put('/actualizarDisponibilidad', (req, res) => {
    const { productoId, nuevoEstado } = req.body; // Suponiendo que envías el nuevo estado en el cuerpo de la solicitud JSON
    const sql = 'UPDATE productos SET producto_disponibilidad = ? WHERE producto_id = ?';

    // Ejecuta la consulta SQL con el ID del producto y el nuevo estado
    connection.query(sql, [nuevoEstado, productoId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al actualizar el estado del producto' });
        } else {

            res.status(200).json({ message: 'Estado del producto actualizado correctamente' });
        }
    });
});

app.put('/modificarProducto', (req, res) => {
    const { producto } = req.body;
    const sqlSinImg = `UPDATE productos SET producto_nombre = ?, producto_descripcion = ?, producto_categoria = ?, producto_precio = ? WHERE producto_id = ?`;
    const sql = `UPDATE productos SET producto_nombre = ?, producto_descripcion = ?, producto_categoria = ?, producto_precio = ?, producto_imagen = ? WHERE producto_id = ?`;

    if (producto.producto_imagen == null) {
        console.log('modificando sin imagen')
        const { producto } = req.body;
        connection.query(sqlSinImg, [
            producto.producto_nombre,
            producto.producto_descripcion,
            producto.producto_categoria,
            producto.producto_precio,
            producto.producto_id
        ], (err, result) => {
            if (err) {
                console.error('Error al modificar producto:', err);
                res.status(500).json({ message: 'Error al modificar producto' });
            } else {
                res.status(200).json({ message: 'Producto modificado exitosamente' });
            }
        });
    } else {
        console.log('modificando con imagen')

        const { producto } = req.body;
        connection.query(sql, [
            producto.producto_nombre,
            producto.producto_descripcion,
            producto.producto_categoria,
            producto.producto_precio,
            producto.producto_imagen,
            producto.producto_id
        ], (err, result) => {
            if (err) {
                console.error('Error al modificar producto:', err);
                res.status(500).json({ message: 'Error al modificar producto' });
            } else {
                res.status(200).json({ message: 'Producto modificado exitosamente' });
            }
        });
    }

});
app.delete('/eliminarProducto', (req, res) => {
    const productoId = req.body.productoId;
    console.log(productoId);
    const sql = 'DELETE FROM productos WHERE producto_id = ?';

    connection.query(sql, productoId, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error al eliminar producto' });
        } else {
            res.status(200).json({ message: 'Producto eliminado' });
        }
    });
});
// ... Otras rutas y configuraciones

if (env == 'dev') {
    app.listen(port, () => {
        console.log(`Servidor funcionando en el puerto ${port}`);
    })
} else {







    // Inicia el servidor
    const privateKey = fs.readFileSync('clave.pem', 'utf8');
    const certificate = fs.readFileSync('certificado.pem', 'utf8');

    const credentials = { key: privateKey, cert: certificate };

    // Crea el servidor HTTPS
    const httpsServer = https.createServer(credentials, app);

    // Escucha en el puerto HTTPS (por ejemplo, el puerto 3500)
    httpsServer.listen(port, () => {
        console.log(`Servidor en funcionamiento en el puerto ${port} (HTTPS)`);
    });
}