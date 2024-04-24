const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const morgan = require('morgan');
const path = require('path'); // Importa el módulo 'path'


const { connect } = require('http2');
const app = express();
const port = 3500;

const https = require("https"),
    fs = require("fs");



const env = "prod";


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());


app.use(morgan('dev'));



if (env == 'dev') {
    connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '2112',
        database: 'menu'
    });
} else {
    connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Nazacapo341746$',
        database: 'menu'
    });
}


const saltRounds = 10; // Número de rounds de salting
const secretKey = 'tu_clave_secreta'; // Cambia esto a una clave secreta segura

// Función para generar un token JWT
function generarToken(usuarioId) {
    const payload = { usuarioId };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expira en 1 hora
}





app.put('/modificarVencimiento', (req, res) => {
    const { usuario, fechaVence } = req.body;
    query = 'UPDATE usuarios SET usuario_fecha_vencimiento = ? WHERE usuario_nombre = ?';
    connection.query(query, [fechaVence, usuario], (err, result) => {
        if (err) {
            console.error('Error al modificar producto:', err);
            res.status(500).json({ message: 'Error al modificar producto' });
        } else {
            res.status(200).json({ message: 'Producto modificado exitosamente' });
        }
    });
});

app.post('/register', (req, res) => {
    const { usuario, contraseña, nombre, fechaVence, email, imagen, direccion, telefono, descripcion, instagram, facebook } = req.body;

    // Hashea la contraseña antes de almacenarla en la base de datos
    bcrypt.hash(contraseña, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ message: 'Error al registrar usuario' });
        } else {
            // Guarda el hash en la base de datos junto con el usuario
            const query = 'INSERT INTO usuarios (usuario_nombre, usuario_contraseña, usuario_nombre_negocio, usuario_fecha_vencimiento, usuario_correo, usuario_imagen, usuario_direccion, usuario_telefono, usuario_descripcion, usuario_instagram, usuario_facebook) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(query, [usuario, hash, nombre, fechaVence, email, imagen, direccion, telefono, descripcion, instagram, facebook], (err, result) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') {
                        res.status(500).json({ message: 'Ya existe este usuario. Por favor elige otro nombre de usuario.' });
                    }
                    console.error('Error al registrar usuario:', err);
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
                const fechaVence = result[0].usuario_fecha_vencimiento;

                // Compara la contraseña ingresada con el hash almacenado
                bcrypt.compare(contraseña, storedHash, (err, result) => {
                    if (err) {
                        console.error('Error al comparar contraseñas:', err);
                        res.status(500).json({ message: 'Error al iniciar sesión' });
                    } else {
                        if (result) {
                            const token = generarToken(usuarioId); // Modifica la función generarToken para aceptar el nombre personal
                            res.status(200).json({ message: 'Inicio de sesión exitoso', token, nombre, nomUsuario, fechaVence });
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


app.post('/comprobar-vencimiento', (req, res) => {
    const datos = req.body;
    let año; // Definir la variable año antes del callback de la consulta

    query = 'SELECT usuario_fecha_vencimiento FROM usuarios WHERE usuario_nombre = ?';
    connection.query(query, datos.usuario, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al consultar la base de datos'); // Enviar respuesta de error si hay un error en la consulta
        } else {
            const fechaUsuario = results[0].usuario_fecha_vencimiento;
            let fechaHoy = new Date();
            if (fechaHoy > fechaUsuario) {
                fechaHoy.setFullYear(2100);
                const fechaActualizada = fechaHoy.toISOString().slice(0, 19).replace('T', ' ');
                query = 'UPDATE usuarios SET usuario_fecha_vencimiento = ? WHERE usuario_nombre = ?';
                connection.query(query, [fechaActualizada, datos.usuario], (err, results) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error al actualizar la fecha de vencimiento'); // Enviar respuesta de error si hay un error en la actualización
                    } else {
                        año = '2100';
                        res.send(año); // Enviar la respuesta dentro del callback de la actualización
                    }
                });
            } else {
                año = new Date(fechaUsuario).getFullYear();
                res.send(año.toString()); // Enviar la respuesta dentro del else
            }
        }
    });
});




app.get('/listarNegocios', async(req, res) => {
    try {
        const query = "SELECT * from usuarios WHERE usuario_nombre != 'admin'";
        connection.query(query, async(error, results) => {
            if (error) {
                console.error('Erro al obtener los negocios de la base de datos:', error);
            } else {
                const negocios = results.map(negocio => {
                    return {
                        usuario: negocio.usuario_nombre,
                        nombre: negocio.usuario_nombre_negocio,
                        fechaVence: negocio.usuario_fecha_vencimiento,
                        direccion: negocio.usuario_direccion,
                        correo: negocio.usuario_correo,
                        telefono: negocio.usuario_telefono,
                        descripcion: negocio.usuario_descripcion,
                        imagen: negocio.usuario_imagen,
                        instagram: negocio.usuario_instagram,
                        facebook: negocio.usuario_facebook,
                    }
                });
                res.json(negocios);
            }
        })
    } catch (error) {
        console.error('Error al obtener negocios. ', error);
    }
})

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyC8vrGiWbmnS138WURJk2odQ9HU_BIEz9s',
    Promise: Promise
});


app.get('/negocios', async(req, res) => {
    try {
        // Consultar la base de datos para obtener la información de los negocios
        const query = "SELECT usuario_nombre, usuario_nombre_negocio, usuario_fecha_vencimiento, usuario_direccion, usuario_correo, usuario_telefono, usuario_descripcion, usuario_imagen, usuario_instagram, usuario_facebook FROM usuarios WHERE usuario_nombre != 'admin'";
        connection.query(query, async(error, results) => {
            if (error) {
                console.error('Error al obtener los negocios de la base de datos:', error);
                res.status(500).json({ error: 'Error al obtener los negocios de la base de datos' });
            } else {
                // Convertir direcciones a coordenadas geográficas
                const negociosPromises = results.map(async negocio => {
                    const direccion = negocio.usuario_direccion;
                    try {
                        const response = await googleMapsClient.geocode({ address: direccion }).asPromise();
                        const { lat, lng } = response.json.results[0].geometry.location;
                        const location = { lat, lng };
                        return {
                            usuario: negocio.usuario_nombre,
                            nombre: negocio.usuario_nombre_negocio,
                            direccion: negocio.usuario_direccion,
                            correo: negocio.usuario_correo,
                            telefono: negocio.usuario_telefono,
                            descripcion: negocio.usuario_descripcion,
                            imagen: negocio.usuario_imagen,
                            instagram: negocio.usuario_instagram,
                            facebook: negocio.usuario_facebook,
                            location: location
                        };
                    } catch (error) {
                        console.error("Error al obtener las coordenadas para la dirección:", direccion, error);
                        return {
                            usuario: negocio.usuario_nombre,
                            nombre: negocio.usuario_nombre_negocio,
                            direccion: negocio.usuario_direccion,
                            correo: negocio.usuario_correo,
                            telefono: negocio.usuario_telefono,
                            descripcion: negocio.usuario_descripcion,
                            imagen: negocio.usuario_imagen,
                            instagram: negocio.usuario_instagram,
                            facebook: negocio.usuario_facebook,
                            location: null
                        };
                    }
                });

                // Esperar a que todas las conversiones de direcciones a coordenadas geográficas se completen
                const negocios = await Promise.all(negociosPromises);

                // Filtrar resultados nulos (sin coordenadas geográficas)
                const negociosValidos = negocios.filter(negocio => negocio !== null);

                res.json(negociosValidos);
            }
        });
    } catch (error) {
        console.error("Error al obtener los negocios:", error);
        res.status(500).json({ error: 'Error al obtener los negocios' });
    }
});

app.get('/miNegocio', (req, res) => {
    const usuario = req.query.usuario;
    const query = "SELECT usuario_nombre_negocio,  usuario_fecha_vencimiento, usuario_correo, usuario_telefono, usuario_descripcion, usuario_imagen, usuario_direccion, usuario_instagram, usuario_facebook FROM usuarios WHERE usuario_nombre = ?";
    // Ejecutar la consulta
    connection.query(query, usuario, (error, results) => {
        if (error) {
            console.error('Error al obtener la información del negocio:', error);
            res.status(500).json({ error: 'Error al obtener la información del negocio' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'No se encontró información del negocio' });
            return;
        }
        res.json({
            usuario: usuario,
            nombre: results[0].usuario_nombre_negocio,
            fechaVence: results[0].usuario_fecha_vencimiento,
            correo: results[0].usuario_correo,
            telefono: results[0].usuario_telefono,
            direccion: results[0].usuario_direccion,
            descripcion: results[0].usuario_descripcion,
            imagen: results[0].usuario_imagen,
            instagram: results[0].usuario_instagram,
            facebook: results[0].usuario_facebook,
        });
    });
});
app.get('/negocio', (req, res) => {
    // Consulta SQL para obtener la información del negocio
    const usuario = req.query.usuario;
    const queryCheck = "SELECT usuario_fecha_vencimiento FROM usuarios WHERE usuario_nombre = ?";
    connection.query(queryCheck, usuario, (error, results) => {
        if (error) {
            console.error('Error al obtener fecha de vencimiento del negocio.', error);
            res.status(500).json({ error: 'Error al obtener la información del negocio' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'No se encontró información del negocio' });
            return;
        }
        const fechaHoy = new Date();
        // Establecer la hora, los minutos, los segundos y los milisegundos a cero
        fechaHoy.setHours(0, 0, 0, 0);

        const fechaVence = new Date(results[0].usuario_fecha_vencimiento);
        // Establecer la hora, los minutos, los segundos y los milisegundos a cero
        fechaVence.setHours(0, 0, 0, 0);


        // Comparar las fechas sin tener en cuenta la hora
        if (fechaVence >= fechaHoy) {
            const query = "SELECT usuario_nombre_negocio,  usuario_correo, usuario_telefono, usuario_descripcion, usuario_imagen, usuario_direccion, usuario_instagram, usuario_facebook FROM usuarios WHERE usuario_nombre = ?";
            // Ejecutar la consulta
            connection.query(query, usuario, (error, results) => {
                if (error) {
                    console.error('Error al obtener la información del negocio:', error);
                    res.status(500).json({ error: 'Error al obtener la información del negocio' });
                    return;
                }

                if (results.length === 0) {
                    res.status(404).json({ error: 'No se encontró información del negocio' });
                    return;
                }
                res.json({
                    usuario: usuario,
                    nombre: results[0].usuario_nombre_negocio,
                    correo: results[0].usuario_correo,
                    telefono: results[0].usuario_telefono,
                    direccion: results[0].usuario_direccion,
                    descripcion: results[0].usuario_descripcion,
                    imagen: results[0].usuario_imagen,
                    instagram: results[0].usuario_instagram,
                    facebook: results[0].usuario_facebook,
                    fechaVence: fechaVence.getFullYear(),
                });
            });
        } else {
            res.status(400).json({ error: 'No se encontró el negocio' });
        }
    })

});

app.put('/modificarPerfil', (req, res) => {
    const { negocio } = req.body;
    console.log(negocio)
    query = 'UPDATE usuarios SET usuario_nombre_negocio = ?, usuario_correo = ?, usuario_telefono = ?, usuario_descripcion = ?, usuario_imagen = ?, usuario_direccion = ?, usuario_instagram = ?, usuario_facebook = ? WHERE usuario_nombre = ?';
    connection.query(query, [negocio.nombre, negocio.correo, negocio.telefono, negocio.descripcion, negocio.imagen, negocio.direccion, negocio.instagram, negocio.facebook, negocio.usuario], (err, result) => {
        if (err) {
            console.error('Error al modificar producto:', err);
            res.status(500).json({ message: 'Error al modificar producto' });
        } else {
            res.status(200).json({ message: 'Producto modificado exitosamente' });
        }
    });
});
app.put('/modificarPerfilAdmin', (req, res) => {
    const { negocio } = req.body;
    query = 'UPDATE usuarios SET usuario_nombre = ?, usuario_contraseña = ?, usuario_nombre_negocio = ?, usuario_fecha_vencimiento = ?, usuario_correo = ?, usuario_telefono = ?, usuario_descripcion = ?, usuario_imagen = ?, usuario_direccion = ?, usuario_instagram = ?, usuario_facebook = ? WHERE usuario_nombre = ?';

    if (negocio.contraseña) {
        const bcrypt = require('bcrypt');
        bcrypt.hash(negocio.contraseña, saltRounds, (err, hash) => {

            if (err) {
                console.log(err)
            } else {

                connection.query(query, [negocio.usuario, hash, negocio.nombre, negocio.fechaVence, negocio.correo, negocio.telefono, negocio.descripcion, negocio.imagen, negocio.direccion, negocio.instagram, negocio.facebook, negocio.usuario], (err, result) => {
                    if (err) {
                        console.error('Error al modificar producto:', err);
                        res.status(500).json({ message: 'Error al modificar producto' });
                    } else {
                        res.status(200).json({ message: 'Producto modificado exitosamente' });
                    }
                });
            }
        });
    } else {
        query = 'UPDATE usuarios SET usuario_nombre = ?, usuario_nombre_negocio = ?, usuario_fecha_vencimiento = ?, usuario_correo = ?, usuario_telefono = ?, usuario_descripcion = ?, usuario_imagen = ?, usuario_direccion = ?, usuario_instagram = ?, usuario_facebook = ? WHERE usuario_nombre = ?';
        connection.query(query, [negocio.usuario, negocio.nombre, negocio.fechaVence, negocio.correo, negocio.telefono, negocio.descripcion, negocio.imagen, negocio.direccion, negocio.instagram, negocio.facebook, negocio.usuario], (err, result) => {
            if (err) {
                console.error('Error al modificar producto:', err);
                res.status(500).json({ message: 'Error al modificar producto' });
            } else {
                res.status(200).json({ message: 'Producto modificado exitosamente' });
            }
        });
    }

});

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
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('dup')
                    res.status(500).json({ message: 'La categoria ya existe.' });
                } else {
                    res.status(500).json({ message: 'Error al procesar la solicitud.' });
                }
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

app.post('/verificar-usuario', (req, res) => {
    const usuario = req.body.usuario;
    query = 'SELECT usuario_nombre FROM usuarios WHERE usuario_nombre = ?';
    connection.query(query, usuario, (err, results) => {
        if (err) {
            console.error("Error al obtener los usuarios:", err);
            res.status(500).json({ message: "Error al obtener los usuarios" });
        } else {
            if (results.length) {
                res.status(200).json(false);
            } else {
                res.status(200).json(true);
            }
        }
    });
})





const mercado = require('mercadopago');

// Configurar Mercado Pago


//const client = new mercado.MercadoPagoConfig({ accessToken: 'APP_USR-3974731186843034-040421-a31df430f192320ee94b04ac13d48f80-232808230' }); //prod
const client = new mercado.MercadoPagoConfig({ accessToken: 'TEST-6756231137958668-041108-d71f41fe529ec1b71e76caf0a57c4334-1755754609' }); //prod

// Crear una instancia de Preference
const pref = new mercado.Preference(client);
const payment = new mercado.Payment(client);

// Crear la preferencia
app.post('/facturar/crearOrden', async(req, res) => {
    const orden = req.body;
    let time = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    const ext_ref = time + ' - ' + orden.usuario;
    const precios = {
        "1": 1500,
        "6": 7500,
        "12": 15000
    };
    const precioPlan = precios[orden.plan];

    const preference = {
        external_reference: ext_ref,
        items: [{
            title: 'Puestito Online',
            unit_price: precioPlan,
            description: 'Plan por ' + orden.plan + ' meses.',
            quantity: 1,
            currency_id: "ARS",
        }],
        payment_methods: {
            excluded_payment_types: [{
                id: "ticket"
            }]
        },
        notification_url: "https://puestito.online/api/facturar/webhook",
    }


    // Crear la preferencia
    const response = await pref.create({
        body: preference

    }).catch(error => {
        console.log(error);
    });
    res.json({ response });
});

app.post('/facturar/verificarPago', async(req, res) => {
    const ref = req.body.ref;
    const query = 'SELECT * FROM facturas WHERE factura_ext_ref = ?';
    connection.query(query, ref, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length) {
                res.send(result[0].factura_status);
            } else {
                res.send(false);
            }
        }
    })
});

app.put('/facturar/acreditar', (req, res) => {
    const datos = req.body;
    const query = `UPDATE usuarios SET usuario_fecha_vencimiento = ? WHERE usuario_nombre = ?`;
    connection.query(query, [datos.fecha, datos.usuario], (err, result) => {
        if (err) {
            console.log(err);
        }
    })
})




app.post('/facturar/webhook', async(req, res) => {
    console.log('webjuk ', req.body.type)
    try {
        const datosPago = req.body;
        if (datosPago.type === 'payment') {
            try {
                const datos = await payment.get({
                    id: datosPago.data.id,
                })

                const queryVerificar = 'SELECT * FROM facturas WHERE factura_id = ?';
                connection.query(queryVerificar, datos.id, (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (res.length) {
                            const queryUpdate = 'UPDATE facturas SET factura_status = ? WHERE factura_id = ?';
                            connection.query(queryUpdate, [datos.status, datos.id], (err, result) => {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        } else {
                            const query = 'INSERT INTO facturas (factura_id, factura_ext_ref, factura_status) VALUES (?, ?, ?)';
                            try {
                                connection.query(query, [datos.id, datos.external_reference, datos.status], (err, result) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                            } catch (error) {
                                console.log('error');
                            }
                        }
                    }
                })


            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log('Error: ', error);
    }
});

if (env == 'dev') {
    app.listen(port, () => {
        console.log(`Servidor funcionando en el puerto ${port}`);
    })
} else {
    const options = {
        key: fs.readFileSync("/var/www/ssl/puestito.online.key"),
        cert: fs.readFileSync("/var/www/ssl/puestito.online.crt")
    };
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(3500);
    console.log('Servidor funcionando en puerto 3500');
}