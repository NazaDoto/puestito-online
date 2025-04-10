const express = require('express');
const db = require('../db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const uploadDir = path.join(__dirname, 'uploads');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Asegura que usa la carpeta existente
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });


const router = express.Router();

const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};


// Ruta para obtener todas las notificaciones para un usuario específico
router.get('/todas/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const [notificaciones] = await db.query(`
            SELECT 
                n.id,
                n.referencia, 
                n.contenido, 
                n.id_emisor,
                n.fecha_envio, 
                GROUP_CONCAT(DISTINCT ur.nombre SEPARATOR ', ') AS receptores,
                u.nombre AS emisor, 
                a.descripcion AS area, 
                d.descripcion AS direccion,
                COALESCE(d.abreviacion, '') AS abreviacion,
                MAX(nr.leida) AS leida -- Verifica si al menos una fila tiene 'leida' como 1
            FROM notificaciones n
            LEFT JOIN noti_receptor nr ON n.id = nr.id_noti
            LEFT JOIN usuarios u ON n.id_emisor = u.id
            LEFT JOIN usuarios ur ON nr.id_receptor = ur.id
            LEFT JOIN areas a ON n.id_area = a.id
            LEFT JOIN direcciones d ON a.id_direccion = d.id
            WHERE n.id_emisor = ? OR nr.id_receptor = ? 
            GROUP BY 
                n.id, n.referencia, n.contenido, n.id_emisor, n.fecha_envio, 
                u.nombre, a.descripcion, d.descripcion, d.abreviacion
            ORDER BY n.fecha_envio DESC;
        `, [usuarioId, usuarioId]);

        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
});


// Ruta para obtener todas las notificaciones enviadas para un usuario específico
router.get('/enviadas/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const [notificaciones] = await db.query(`
            SELECT 
                n.id, 
                n.referencia, 
                n.contenido, 
                n.fecha_envio, 
                u.nombre AS emisor, 
                GROUP_CONCAT(DISTINCT ur.nombre SEPARATOR ', ') AS receptores,
                a.descripcion AS area, 
                d.descripcion AS direccion,
                COALESCE(d.abreviacion, '') AS abreviacion

            FROM notificaciones n
            JOIN noti_receptor nr ON n.id = nr.id_noti
            JOIN usuarios u ON n.id_emisor = u.id
            JOIN usuarios ur ON nr.id_receptor = ur.id
            JOIN areas a ON n.id_area = a.id
            JOIN direcciones d ON a.id_direccion = d.id
            WHERE n.id_emisor = ?
            GROUP BY n.id
            ORDER BY n.fecha_envio DESC
        `, [usuarioId]);

        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
});

router.get('/recibidas/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const [notificaciones] = await db.query(`
            SELECT 
                COALESCE(n.id) AS id,
                COALESCE(n.id_emisor) AS id_emisor,
                COALESCE(res.contenido, n.contenido) AS contenido,
                COALESCE(n.referencia) AS referencia,
                COALESCE(nr.leida) AS leida,
                COALESCE(nr.leida_emisor) AS leida_emisor,
                COALESCE(res.fecha_envio, n.fecha_envio) AS fecha_envio,
                COALESCE(u.nombre, 'Sistema') AS emisor,
                COALESCE(a.descripcion, '') AS area,
                COALESCE(d.descripcion, '') AS direccion,
                COALESCE(d.abreviacion, '') AS abreviacion,

                res.cantidad_respuestas,
                CASE 
                    WHEN (SELECT COUNT(*) FROM noti_adjunto WHERE id_noti = n.id) > 0 THEN 1
                    ELSE 0
                END AS adjunto
            FROM notificaciones n
            LEFT JOIN noti_receptor nr ON n.id = nr.id_noti AND nr.id_receptor = ?
            LEFT JOIN usuarios u ON n.id_emisor = u.id
            LEFT JOIN areas a ON n.id_area = a.id
            LEFT JOIN direcciones d ON u.id_direccion = d.id
            LEFT JOIN (
    SELECT 
        r1.id_noti,
        r1.fecha_envio,
        r1.contenido,
        (
            SELECT COUNT(*)
            FROM noti_respuesta r2
            WHERE r2.id_noti = r1.id_noti
        ) AS cantidad_respuestas
    FROM noti_respuesta r1
    WHERE r1.fecha_envio = (
        SELECT MAX(r2.fecha_envio)
        FROM noti_respuesta r2
        WHERE r2.id_noti = r1.id_noti
    )
) res ON res.id_noti = n.id
            WHERE nr.id_receptor = ? OR EXISTS (
                SELECT 1 
                FROM noti_respuesta r 
                WHERE r.id_noti = n.id AND nr.id_receptor = ?
                  AND (SELECT COUNT(*) FROM noti_respuesta r2 WHERE r2.id_noti = n.id)
            )
            ORDER BY COALESCE(res.fecha_envio, n.fecha_envio) DESC
        `, [usuarioId, usuarioId, usuarioId]);

        console.log(notificaciones)

        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
});


// Ruta para obtener una notificación específica
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const usuarioId = req.query.usuarioId;

    try {
        // Obtener información básica de la notificación
        const [notificacion] = await db.query(`
            SELECT n.id, n.tipo, n.referencia, n.contenido, n.fecha_envio, n.id_emisor, nr.leida, nr.leida_emisor,
                   u.nombre AS emisor, a.descripcion AS area, d.descripcion AS direccion
            FROM notificaciones n
            JOIN noti_receptor nr ON n.id = nr.id_noti
            JOIN usuarios u ON n.id_emisor = u.id
            JOIN areas a ON n.id_area = a.id
            JOIN direcciones d ON a.id_direccion = d.id
            WHERE n.id = ?
        `, [id]);
        if (notificacion.length === 0) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }

        // Obtener los destinatarios de la notificación
        const [destinatarios] = await db.query(`
            SELECT u.id, u.nombre, nr.leida
            FROM noti_receptor nr
            JOIN usuarios u ON nr.id_receptor = u.id
            WHERE nr.id_noti = ?
        `, [id]);

        // Obtener los archivos adjuntos de la notificación
        const [archivos] = await db.query(`
            SELECT path
            FROM noti_adjunto
            WHERE id_noti = ?
        `, [id]);

        // Obtener las respuestas a la notificación
        const [respuestas] = await db.query(`
            SELECT r.id, r.emisor, r.contenido, r.fecha_envio
            FROM noti_respuesta r
            WHERE r.id_noti = ?
        `, [id]);

        // Obtener los archivos adjuntos de las respuestas
        for (let respuesta of respuestas) {
            const [adjuntos] = await db.query(`
                SELECT path
                FROM respuesta_adjunto
                WHERE id_respuesta = ?
            `, [respuesta.id]);

            respuesta.archivos = adjuntos.map(archivo => ({
                nombre: archivo.path.split('/').pop(), // Extrae el nombre del archivo de la ruta
                url: archivo.path // Usa la ruta completa del archivo
            }));
        }

        // Construir la notificación completa
        const notificacionCompleta = {
            ...notificacion[0],
            destinatarios,
            archivos: archivos.map(archivo => ({
                nombre: archivo.path.split('/').pop(),
                url: archivo.path
            })),
            respuestas
        };

        // Verificar si el usuario es el emisor o un receptor
        const esReceptor = destinatarios.some(destinatario => destinatario.id === parseInt(usuarioId));
        const esEmisor = notificacion[0].id_emisor === parseInt(usuarioId);

        try {
            const [response] = await db.query('SELECT esAdmin FROM usuarios WHERE id = ?', [parseInt(usuarioId)]);
            if (response[0].esAdmin == 1) {
                return res.json(notificacionCompleta);
            }
        } catch (error) {
            console.log('No se pudo obtener esAdmin. ', error);
        }

        if (!esReceptor && !esEmisor) {
            return res.status(403).json({ message: 'No tienes permiso para ver esta notificación' });
        }
        res.json(notificacionCompleta);
    } catch (error) {
        console.error('Error al obtener notificación:', error);
        res.status(500).json({ message: 'Error al obtener notificación' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [notificaciones] = await db.query(`
            SELECT 
                n.*,
                emisor.nombre AS emisor, a.descripcion AS area, d.descripcion AS direccion,
                CASE 
                    WHEN n.tipo = 'individual' THEN (SELECT GROUP_CONCAT(u.nombre) 
                                                     FROM usuarios u 
                                                     JOIN noti_receptor nr ON u.id = nr.id_receptor
                                                     WHERE nr.id_noti = n.id)
                    WHEN n.tipo = 'grupal' THEN (SELECT GROUP_CONCAT(u.nombre) 
                                                 FROM usuarios u 
                                                 JOIN noti_receptor nr ON u.id = nr.id_receptor
                                                 WHERE nr.id_noti = n.id)
                END AS receptores
            FROM notificaciones n
            LEFT JOIN usuarios emisor ON n.id_emisor = emisor.id
            JOIN areas a ON n.id_area = a.id
            JOIN direcciones d ON a.id_direccion = d.id
            ORDER BY n.fecha_envio DESC
        `);
        res.json(notificaciones);
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener las notificaciones' });
    }
})

// Ruta para marcar una notificación como leída
router.put('/leida/:id', async (req, res) => {
    const { id } = req.params;
    const { usuarioId } = req.body; // Suponemos que el ID del usuario que marca la notificación como leída viene en el cuerpo de la solicitud

    try {
        await db.query(`
    UPDATE noti_receptor
    SET 
        leida = CASE 
            WHEN ? != (SELECT id_emisor FROM notificaciones WHERE id = id_noti) THEN true
            ELSE leida
        END,
        leida_emisor = CASE 
            WHEN ? = (SELECT id_emisor FROM notificaciones WHERE id = id_noti) THEN true
            ELSE leida_emisor
        END
    WHERE id_noti = ?
`, [usuarioId, usuarioId, id]);
        res.json({ message: 'Notificación marcada como leída' });
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
        res.status(500).json({ message: 'Error al marcar notificación como leída' });
    }
});

// NOTIFICAR
router.post('/notificar', upload.array('archivos'), async (req, res) => {
    let { tipo, id_emisor, id_direccion, id_area, id_subarea, referencia, contenido, id_receptor, fecha_envio } = req.body;
    const archivos = req.files;
    if (id_subarea == 'default') {
        id_subarea = null;
    }

    try {
        let id_noti;

        const payload = {
            title: 'Tienes una nueva notificación',
            icon: '/favicon.ico',
            url: 'https://sn-mds.vercel.app',
        };

        // Verificar si se envía a todas las direcciones
        if (id_direccion === 'Todas') {
            const [result] = await db.query(
                'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['grupal', id_emisor, 10, 51, referencia, contenido, fecha_envio]
            );

            id_noti = result.insertId;

            // Vincular notificación con todos los usuarios excepto el emisor
            const [usuarios] = await db.query('SELECT id FROM usuarios WHERE id != ?', [id_emisor]);
            for (const usuario of usuarios) {
                await db.query(
                    'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                    [id_noti, usuario.id, false]
                );
                try {
                    const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                        usuarioId: usuario.id,
                        payload,
                    });

                    if (respuestaPush.status === 200) {
                        console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                    } else {
                        console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                    }
                } catch (error) {
                    console.error(`Error al llamar a push-api:`, error);
                }
                try {
                    const [telQuery] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [usuario.id]);
                    const telefono = telQuery[0].telefono;

                    const [emisorQuery] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id_emisor]);
                    const emisor = emisorQuery[0].nombre;
                    // Aquí se envía la notificación por WhatsApp Business
                    const whatsappResponse = await axios.post(
                        "https://graph.facebook.com/v21.0/589775480875611/messages",
                        {
                            messaging_product: "whatsapp",
                            to: '54' + telefono, // Reemplaza con el número de teléfono dinámico si es necesario
                            type: "template",
                            template: {
                                name: "notificacion", // Ajusta el nombre del template según tu configuración
                                language: {
                                    code: "es_AR", // Ajusta el idioma según tu configuración
                                },
                                components: [
                                    {
                                        type: "header",
                                        parameters: [{
                                            type: "image",
                                            image: {
                                                link: 'https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png'
                                            }
                                        }]
                                    },
                                    {
                                        type: "body",
                                        parameters: [
                                            {
                                                type: "text",
                                                text: [emisor].toString()
                                            },
                                            {
                                                type: "text",
                                                text: [referencia].toString()
                                            }
                                        ]
                                    }]
                            },

                        },
                        {
                            headers: {
                                Authorization: `Bearer EAAIQ4mYW458BO3S1LnghDpieZCMiaM0RRPrGxyelXd2IBeeMC1KNzZB1N9XX2l3mdxjBC55zRbATlM2BofRhW6TQKZBG7ZBdIYMp9mzzE53Xe6QqJA07w0tvq58ZCFjY1TPNI4zk0B6hs8XnMZCGUnQfLuvenu7mw0nbQVpEOqTz6GJEdUJtnZBrWXc2NGdfOH5BIEtQqA3VMVu5Ors3Ww90tynEYEZD`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    console.log("WhatsApp Business API response:", whatsappResponse.data);
                } catch (error) {
                    console.log('No se pudo obtener/enviar noti al telefono del usuario ', usuario.id, error.response.data.error);
                }
                // Enviar notificación por correo
                try {

                    const [mailQuery] = await db.query('SELECT mail FROM usuarios WHERE id = ?', [id_receptor]);
                    const mail = mailQuery[0].mail;

                    const [emisorQuery] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id_emisor]);
                    const emisor = emisorQuery[0];

                    const [areaQuery] = await db.query('SELECT descripcion FROM areas WHERE id = ?', [emisor.id_area]);
                    const area = areaQuery[0].descripcion;
                    const [direccionQuery] = await db.query('SELECT descripcion FROM direcciones WHERE id = ?', [emisor.id_direccion]);
                    const direccion = direccionQuery[0].descripcion;
                    const date = capitalize(new Date(fecha_envio).toLocaleDateString('es-ES', {
                        weekday: 'long', year:
                            'numeric', month: 'long', day: 'numeric'
                    }));

                    const transporter = nodemailer.createTransport({
                        host: 'mail.complejojfi.gob.ar', // Cambia al servidor SMTP correspondiente
                        port: 25, // Puerto SMTP, podría ser 465 para SSL o 587 para STARTTLS
                        secure: false, // Cambiar a `true` si usas SSL
                        auth: {
                            user: process.env.MAIL_ACC, // Usuario del correo
                            pass: process.env.MAIL_PW, // Contraseña del correo
                        },
                        tls: {
                            rejectUnauthorized: false  // Ignorar el certificado autofirmado
                        }
                    });

                    const mailOptions = {
                        from: '"Notificaciones MDS" <notificaciones@mdssde.gob.ar>',
                        to: mail,
                        subject: 'Notificación de ' + [emisor.nombre],
                        html:
                            `<div style="box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); background-color: white; padding: 1cm 2.5cm 5px 2.5cm;">
                        <div id="notificacion">
                            <div style="margin-top: 5px; text-align: center;">
                            <div style="display: flex; width: 100%; margin-bottom: 10px;">
                                <img style="max-height: 50px;" src="https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png" alt="">
                                <img style="max-height: 50px;margin-left:auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHEILRdMa_IWD8m1ym3F-YRJIrHsFHGlsjg&s" alt="">
                            </div>
                            <div style="font-size: 14px; text-align: start;color: #888;">NOTI-`+ [id_noti] + `</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">SANTIAGO DEL ESTERO</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">
                                `+ [date] + `
                            </div>
                            <h5 style="text-align: start;font-size: 22px;
                        margin: 20px 0;
                        font-weight: bold;">`+ [referencia] + `</h5>
                            </div>
                            <div>
                            <hr />
                            <div style="margin: 0 5%; padding: 20px;">
                                <div style="margin-top: 16px;">`+ [contenido] + `</div>
                            </div>
                            </div>
                            <div style="font-size: 14px; margin-top: 16px;color: #888;">`+ [emisor.nombre] + `</div>
                            <div style="font-size: 14px;color: #888;">`+ area + `</div>
                            <div style="font-size: 14px; margin-bottom: 16px;color: #888;">`+ direccion + `</div>
                        </div>
                        </div>
                    `,
                        attachments: req.files,
                    };
                    try {
                        const info = await transporter.sendMail(mailOptions);
                        console.log('Correo enviado:', info.messageId);
                    } catch (error) {
                        console.error('Error al enviar correo:', error);
                    }
                }
                catch (error) {
                    console.log('Error al mandar mail: ', error)
                }
            }
        }
        // Verificar si se envía a todas las áreas de una dirección
        else if (id_area === 'Todas') {
            const [result] = await db.query(
                'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?)',
                ['grupal', id_emisor, id_direccion, 51, referencia, contenido, fecha_envio]
            );

            id_noti = result.insertId;

            // Obtener todos los usuarios de la dirección excepto el emisor
            const [usuarios] = await db.query(
                'SELECT id FROM usuarios WHERE id_direccion = ? AND id != ?',
                [id_direccion, id_emisor]
            );

            for (const usuario of usuarios) {
                await db.query(
                    'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                    [id_noti, usuario.id, false]
                );
                try {
                    const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                        usuarioId: usuario.id,
                        payload,
                    });

                    if (respuestaPush.status === 200) {
                        console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                    } else {
                        console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                    }
                } catch (error) {
                    console.error(`Error al llamar a push-api:`, error);
                }
                try {
                    const [telQuery] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [usuario.id]);
                    const telefono = telQuery[0].telefono;

                    const [emisorQuery] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id_emisor]);
                    const emisor = emisorQuery[0].nombre;
                    // Aquí se envía la notificación por WhatsApp Business
                    const whatsappResponse = await axios.post(
                        "https://graph.facebook.com/v21.0/589775480875611/messages",
                        {
                            messaging_product: "whatsapp",
                            to: '54' + telefono, // Reemplaza con el número de teléfono dinámico si es necesario
                            type: "template",
                            template: {
                                name: "notificacion", // Ajusta el nombre del template según tu configuración
                                language: {
                                    code: "es_AR", // Ajusta el idioma según tu configuración
                                },
                                components: [
                                    {
                                        type: "header",
                                        parameters: [{
                                            type: "image",
                                            image: {
                                                link: 'https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png'
                                            }
                                        }]
                                    },
                                    {
                                        type: "body",
                                        parameters: [
                                            {
                                                type: "text",
                                                text: [emisor].toString()
                                            },
                                            {
                                                type: "text",
                                                text: [referencia].toString()
                                            }
                                        ]
                                    }]
                            },

                        },
                        {
                            headers: {
                                Authorization: `Bearer EAAIQ4mYW458BO3S1LnghDpieZCMiaM0RRPrGxyelXd2IBeeMC1KNzZB1N9XX2l3mdxjBC55zRbATlM2BofRhW6TQKZBG7ZBdIYMp9mzzE53Xe6QqJA07w0tvq58ZCFjY1TPNI4zk0B6hs8XnMZCGUnQfLuvenu7mw0nbQVpEOqTz6GJEdUJtnZBrWXc2NGdfOH5BIEtQqA3VMVu5Ors3Ww90tynEYEZD`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    console.log("WhatsApp Business API response:", whatsappResponse.data);
                } catch (error) {
                    console.log('No se pudo obtener/enviar noti al telefono del usuario ', usuario.id, error.response.data.error);
                }
                // Enviar notificación por correo
                try {

                    const [mailQuery] = await db.query('SELECT mail FROM usuarios WHERE id = ?', [id_receptor]);
                    const mail = mailQuery[0].mail;

                    const [emisorQuery] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id_emisor]);
                    const emisor = emisorQuery[0];

                    const [areaQuery] = await db.query('SELECT descripcion FROM areas WHERE id = ?', [emisor.id_area]);
                    const area = areaQuery[0].descripcion;
                    const [direccionQuery] = await db.query('SELECT descripcion FROM direcciones WHERE id = ?', [emisor.id_direccion]);
                    const direccion = direccionQuery[0].descripcion;
                    const date = capitalize(new Date(fecha_envio).toLocaleDateString('es-ES', {
                        weekday: 'long', year:
                            'numeric', month: 'long', day: 'numeric'
                    }));

                    const transporter = nodemailer.createTransport({
                        host: 'mail.complejojfi.gob.ar', // Cambia al servidor SMTP correspondiente
                        port: 25, // Puerto SMTP, podría ser 465 para SSL o 587 para STARTTLS
                        secure: false, // Cambiar a `true` si usas SSL
                        auth: {
                            user: process.env.MAIL_ACC, // Usuario del correo
                            pass: process.env.MAIL_PW, // Contraseña del correo
                        },
                        tls: {
                            rejectUnauthorized: false  // Ignorar el certificado autofirmado
                        }
                    });

                    const mailOptions = {
                        from: '"Notificaciones MDS" <notificaciones@mdssde.gob.ar>',
                        to: mail,
                        subject: 'Notificación de ' + [emisor.nombre],
                        html:
                            `<div style="box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); background-color: white; padding: 1cm 2.5cm 5px 2.5cm;">
                        <div id="notificacion">
                            <div style="margin-top: 5px; text-align: center;">
                            <div style="display: flex; width: 100%; margin-bottom: 10px;">
                                <img style="max-height: 50px;" src="https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png" alt="">
                                <img style="max-height: 50px;margin-left:auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHEILRdMa_IWD8m1ym3F-YRJIrHsFHGlsjg&s" alt="">
                            </div>
                            <div style="font-size: 14px; text-align: start;color: #888;">NOTI-`+ [id_noti] + `</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">SANTIAGO DEL ESTERO</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">
                                `+ [date] + `
                            </div>
                            <h5 style="text-align: start;font-size: 22px;
                        margin: 20px 0;
                        font-weight: bold;">`+ [referencia] + `</h5>
                            </div>
                            <div>
                            <hr />
                            <div style="margin: 0 5%; padding: 20px;">
                                <div style="margin-top: 16px;">`+ [contenido] + `</div>
                            </div>
                            </div>
                            <div style="font-size: 14px; margin-top: 16px;color: #888;">`+ [emisor.nombre] + `</div>
                            <div style="font-size: 14px;color: #888;">`+ area + `</div>
                            <div style="font-size: 14px; margin-bottom: 16px;color: #888;">`+ direccion + `</div>
                        </div>
                        </div>
                    `,
                        attachments: req.files,
                    };
                    try {
                        const info = await transporter.sendMail(mailOptions);
                        console.log('Correo enviado:', info.messageId);
                    } catch (error) {
                        console.error('Error al enviar correo:', error);
                    }
                }
                catch (error) {
                    console.log('Error al mandar mail: ', error)
                }
            }
        }
        else if (id_subarea === 'Todas') {
            const [result] = await db.query(
                'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, id_subarea, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                ['grupal', id_emisor, id_direccion, id_area, 6, referencia, contenido, fecha_envio]
            );

            id_noti = result.insertId;

            // Obtener todos los usuarios de la dirección excepto el emisor
            const [usuarios] = await db.query(
                'SELECT id FROM usuarios WHERE id_area = ? AND id != ?',
                [id_area, id_emisor]
            );

            for (const usuario of usuarios) {
                await db.query(
                    'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                    [id_noti, usuario.id, false]
                );
                try {
                    const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                        usuarioId: usuario.id,
                        payload,
                    });

                    if (respuestaPush.status === 200) {
                        console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                    } else {
                        console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                    }
                } catch (error) {
                    console.error(`Error al llamar a push-api:`, error);
                }
                try {
                    const [telQuery] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [usuario.id]);
                    const telefono = telQuery[0].telefono;

                    const [emisorQuery] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id_emisor]);
                    const emisor = emisorQuery[0].nombre;
                    // Aquí se envía la notificación por WhatsApp Business
                    const whatsappResponse = await axios.post(
                        "https://graph.facebook.com/v21.0/589775480875611/messages",
                        {
                            messaging_product: "whatsapp",
                            to: '54' + telefono, // Reemplaza con el número de teléfono dinámico si es necesario
                            type: "template",
                            template: {
                                name: "notificacion", // Ajusta el nombre del template según tu configuración
                                language: {
                                    code: "es_AR", // Ajusta el idioma según tu configuración
                                },
                                components: [
                                    {
                                        type: "header",
                                        parameters: [{
                                            type: "image",
                                            image: {
                                                link: 'https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png'
                                            }
                                        }]
                                    },
                                    {
                                        type: "body",
                                        parameters: [
                                            {
                                                type: "text",
                                                text: [emisor].toString()
                                            },
                                            {
                                                type: "text",
                                                text: [referencia].toString()
                                            }
                                        ]
                                    }]
                            },

                        },
                        {
                            headers: {
                                Authorization: `Bearer EAAIQ4mYW458BO3S1LnghDpieZCMiaM0RRPrGxyelXd2IBeeMC1KNzZB1N9XX2l3mdxjBC55zRbATlM2BofRhW6TQKZBG7ZBdIYMp9mzzE53Xe6QqJA07w0tvq58ZCFjY1TPNI4zk0B6hs8XnMZCGUnQfLuvenu7mw0nbQVpEOqTz6GJEdUJtnZBrWXc2NGdfOH5BIEtQqA3VMVu5Ors3Ww90tynEYEZD`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    console.log("WhatsApp Business API response:", whatsappResponse.data);
                } catch (error) {
                    console.log('No se pudo obtener/enviar noti al telefono del usuario ', usuario.id, error.response.data.error);
                }
                // Enviar notificación por correo
                try {

                    const [mailQuery] = await db.query('SELECT mail FROM usuarios WHERE id = ?', [id_receptor]);
                    const mail = mailQuery[0].mail;

                    const [emisorQuery] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id_emisor]);
                    const emisor = emisorQuery[0];

                    const [areaQuery] = await db.query('SELECT descripcion FROM areas WHERE id = ?', [emisor.id_area]);
                    const area = areaQuery[0].descripcion;
                    const [direccionQuery] = await db.query('SELECT descripcion FROM direcciones WHERE id = ?', [emisor.id_direccion]);
                    const direccion = direccionQuery[0].descripcion;
                    const date = capitalize(new Date(fecha_envio).toLocaleDateString('es-ES', {
                        weekday: 'long', year:
                            'numeric', month: 'long', day: 'numeric'
                    }));

                    const transporter = nodemailer.createTransport({
                        host: 'mail.complejojfi.gob.ar', // Cambia al servidor SMTP correspondiente
                        port: 25, // Puerto SMTP, podría ser 465 para SSL o 587 para STARTTLS
                        secure: false, // Cambiar a `true` si usas SSL
                        auth: {
                            user: process.env.MAIL_ACC, // Usuario del correo
                            pass: process.env.MAIL_PW, // Contraseña del correo
                        },
                        tls: {
                            rejectUnauthorized: false  // Ignorar el certificado autofirmado
                        }
                    });

                    const mailOptions = {
                        from: '"Notificaciones MDS" <notificaciones@mdssde.gob.ar>',
                        to: mail,
                        subject: 'Notificación de ' + [emisor.nombre],
                        html:
                            `<div style="box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); background-color: white; padding: 1cm 2.5cm 5px 2.5cm;">
                        <div id="notificacion">
                            <div style="margin-top: 5px; text-align: center;">
                            <div style="display: flex; width: 100%; margin-bottom: 10px;">
                                <img style="max-height: 50px;" src="https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png" alt="">
                                <img style="max-height: 50px;margin-left:auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHEILRdMa_IWD8m1ym3F-YRJIrHsFHGlsjg&s" alt="">
                            </div>
                            <div style="font-size: 14px; text-align: start;color: #888;">NOTI-`+ [id_noti] + `</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">SANTIAGO DEL ESTERO</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">
                                `+ [date] + `
                            </div>
                            <h5 style="text-align: start;font-size: 22px;
                        margin: 20px 0;
                        font-weight: bold;">`+ [referencia] + `</h5>
                            </div>
                            <div>
                            <hr />
                            <div style="margin: 0 5%; padding: 20px;">
                                <div style="margin-top: 16px;">`+ [contenido] + `</div>
                            </div>
                            </div>
                            <div style="font-size: 14px; margin-top: 16px;color: #888;">`+ [emisor.nombre] + `</div>
                            <div style="font-size: 14px;color: #888;">`+ area + `</div>
                            <div style="font-size: 14px; margin-bottom: 16px;color: #888;">`+ direccion + `</div>
                        </div>
                        </div>
                    `,
                        attachments: req.files,
                    };
                    try {
                        const info = await transporter.sendMail(mailOptions);
                        console.log('Correo enviado:', info.messageId);
                    } catch (error) {
                        console.error('Error al enviar correo:', error);
                    }
                }
                catch (error) {
                    console.log('Error al mandar mail: ', error)
                }
            }
        }
        // Verificar si se envía a todos los usuarios de un área
        else if (id_receptor === 'Todos') {
            if (id_subarea) {
                const [result] = await db.query(
                    'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, id_subarea, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    ['grupal', id_emisor, id_direccion, id_area, id_subarea, referencia, contenido, fecha_envio]
                );

                id_noti = result.insertId;

                // Obtener todos los usuarios del área excepto el emisor
                const [usuarios] = await db.query(
                    'SELECT id FROM usuarios WHERE id_subarea = ? AND id_area = ? AND id_direccion = ? AND id != ?',
                    [id_subarea, id_area, id_direccion, id_emisor]
                );

                for (const usuario of usuarios) {
                    await db.query(
                        'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                        [id_noti, usuario.id, false]
                    );
                    try {
                        const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                            usuarioId: usuario.id,
                            payload,
                        });

                        if (respuestaPush.status === 200) {
                            console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                        } else {
                            console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                        }
                    } catch (error) {
                        console.error(`Error al llamar a push-api:`, error);
                    }
                    try {
                        const [telQuery] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [usuario.id]);
                        const telefono = telQuery[0].telefono;

                        const [emisorQuery] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id_emisor]);
                        const emisor = emisorQuery[0].nombre;
                        // Aquí se envía la notificación por WhatsApp Business
                        const whatsappResponse = await axios.post(
                            "https://graph.facebook.com/v21.0/589775480875611/messages",
                            {
                                messaging_product: "whatsapp",
                                to: '54' + telefono, // Reemplaza con el número de teléfono dinámico si es necesario
                                type: "template",
                                template: {
                                    name: "notificacion", // Ajusta el nombre del template según tu configuración
                                    language: {
                                        code: "es_AR", // Ajusta el idioma según tu configuración
                                    },
                                    components: [
                                        {
                                            type: "header",
                                            parameters: [{
                                                type: "image",
                                                image: {
                                                    link: 'https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png'
                                                }
                                            }]
                                        },
                                        {
                                            type: "body",
                                            parameters: [
                                                {
                                                    type: "text",
                                                    text: [emisor].toString()
                                                },
                                                {
                                                    type: "text",
                                                    text: [referencia].toString()
                                                }
                                            ]
                                        }]
                                },

                            },
                            {
                                headers: {
                                    Authorization: `Bearer EAAIQ4mYW458BO3S1LnghDpieZCMiaM0RRPrGxyelXd2IBeeMC1KNzZB1N9XX2l3mdxjBC55zRbATlM2BofRhW6TQKZBG7ZBdIYMp9mzzE53Xe6QqJA07w0tvq58ZCFjY1TPNI4zk0B6hs8XnMZCGUnQfLuvenu7mw0nbQVpEOqTz6GJEdUJtnZBrWXc2NGdfOH5BIEtQqA3VMVu5Ors3Ww90tynEYEZD`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        console.log("WhatsApp Business API response:", whatsappResponse.data);
                    } catch (error) {
                        console.log('No se pudo obtener/enviar noti al telefono del usuario ', usuario.id, error.response.data.error);
                    }
                    // Enviar notificación por correo
                    try {

                        const [mailQuery] = await db.query('SELECT mail FROM usuarios WHERE id = ?', [id_receptor]);
                        const mail = mailQuery[0].mail;

                        const [emisorQuery] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id_emisor]);
                        const emisor = emisorQuery[0];

                        const [areaQuery] = await db.query('SELECT descripcion FROM areas WHERE id = ?', [emisor.id_area]);
                        const area = areaQuery[0].descripcion;
                        const [direccionQuery] = await db.query('SELECT descripcion FROM direcciones WHERE id = ?', [emisor.id_direccion]);
                        const direccion = direccionQuery[0].descripcion;
                        const date = capitalize(new Date(fecha_envio).toLocaleDateString('es-ES', {
                            weekday: 'long', year:
                                'numeric', month: 'long', day: 'numeric'
                        }));

                        const transporter = nodemailer.createTransport({
                            host: 'mail.complejojfi.gob.ar', // Cambia al servidor SMTP correspondiente
                            port: 25, // Puerto SMTP, podría ser 465 para SSL o 587 para STARTTLS
                            secure: false, // Cambiar a `true` si usas SSL
                            auth: {
                                user: process.env.MAIL_ACC, // Usuario del correo
                                pass: process.env.MAIL_PW, // Contraseña del correo
                            },
                            tls: {
                                rejectUnauthorized: false  // Ignorar el certificado autofirmado
                            }
                        });

                        const mailOptions = {
                            from: '"Notificaciones MDS" <notificaciones@mdssde.gob.ar>',
                            to: mail,
                            subject: 'Notificación de ' + [emisor.nombre],
                            html:
                                `<div style="box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); background-color: white; padding: 1cm 2.5cm 5px 2.5cm;">
                        <div id="notificacion">
                            <div style="margin-top: 5px; text-align: center;">
                            <div style="display: flex; width: 100%; margin-bottom: 10px;">
                                <img style="max-height: 50px;" src="https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png" alt="">
                                <img style="max-height: 50px;margin-left:auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHEILRdMa_IWD8m1ym3F-YRJIrHsFHGlsjg&s" alt="">
                            </div>
                            <div style="font-size: 14px; text-align: start;color: #888;">NOTI-`+ [id_noti] + `</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">SANTIAGO DEL ESTERO</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">
                                `+ [date] + `
                            </div>
                            <h5 style="text-align: start;font-size: 22px;
                        margin: 20px 0;
                        font-weight: bold;">`+ [referencia] + `</h5>
                            </div>
                            <div>
                            <hr />
                            <div style="margin: 0 5%; padding: 20px;">
                                <div style="margin-top: 16px;">`+ [contenido] + `</div>
                            </div>
                            </div>
                            <div style="font-size: 14px; margin-top: 16px;color: #888;">`+ [emisor.nombre] + `</div>
                            <div style="font-size: 14px;color: #888;">`+ area + `</div>
                            <div style="font-size: 14px; margin-bottom: 16px;color: #888;">`+ direccion + `</div>
                        </div>
                        </div>
                    `,
                            attachments: req.files,
                        };
                        try {
                            const info = await transporter.sendMail(mailOptions);
                            console.log('Correo enviado:', info.messageId);
                        } catch (error) {
                            console.error('Error al enviar correo:', error);
                        }
                    }
                    catch (error) {
                        console.log('Error al mandar mail: ', error)
                    }
                }
            } else {
                const [result] = await db.query(
                    'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    ['grupal', id_emisor, id_direccion, id_area, referencia, contenido, fecha_envio]
                );

                id_noti = result.insertId;

                // Obtener todos los usuarios del área excepto el emisor
                const [usuarios] = await db.query(
                    'SELECT id FROM usuarios WHERE id_area = ? AND id_direccion = ? AND id != ?',
                    [id_area, id_direccion, id_emisor]
                );

                for (const usuario of usuarios) {
                    await db.query(
                        'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                        [id_noti, usuario.id, false]
                    );
                    try {
                        const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                            usuarioId: usuario.id,
                            payload,
                        });

                        if (respuestaPush.status === 200) {
                            console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                        } else {
                            console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                        }
                    } catch (error) {
                        console.error(`Error al llamar a push-api:`, error);
                    }
                    try {
                        const [telQuery] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [usuario.id]);
                        const telefono = telQuery[0].telefono;

                        const [emisorQuery] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id_emisor]);
                        const emisor = emisorQuery[0].nombre;
                        // Aquí se envía la notificación por WhatsApp Business
                        const whatsappResponse = await axios.post(
                            "https://graph.facebook.com/v21.0/589775480875611/messages",
                            {
                                messaging_product: "whatsapp",
                                to: '54' + telefono, // Reemplaza con el número de teléfono dinámico si es necesario
                                type: "template",
                                template: {
                                    name: "notificacion", // Ajusta el nombre del template según tu configuración
                                    language: {
                                        code: "es_AR", // Ajusta el idioma según tu configuración
                                    },
                                    components: [
                                        {
                                            type: "header",
                                            parameters: [{
                                                type: "image",
                                                image: {
                                                    link: 'https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png'
                                                }
                                            }]
                                        },
                                        {
                                            type: "body",
                                            parameters: [
                                                {
                                                    type: "text",
                                                    text: [emisor].toString()
                                                },
                                                {
                                                    type: "text",
                                                    text: [referencia].toString()
                                                }
                                            ]
                                        }]
                                },

                            },
                            {
                                headers: {
                                    Authorization: `Bearer EAAIQ4mYW458BO3S1LnghDpieZCMiaM0RRPrGxyelXd2IBeeMC1KNzZB1N9XX2l3mdxjBC55zRbATlM2BofRhW6TQKZBG7ZBdIYMp9mzzE53Xe6QqJA07w0tvq58ZCFjY1TPNI4zk0B6hs8XnMZCGUnQfLuvenu7mw0nbQVpEOqTz6GJEdUJtnZBrWXc2NGdfOH5BIEtQqA3VMVu5Ors3Ww90tynEYEZD`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        console.log("WhatsApp Business API response:", whatsappResponse.data);
                    } catch (error) {
                        console.log('No se pudo obtener/enviar noti al telefono del usuario ', usuario.id, error.response.data.error);
                    }
                    // Enviar notificación por correo
                    try {

                        const [mailQuery] = await db.query('SELECT mail FROM usuarios WHERE id = ?', [id_receptor]);
                        const mail = mailQuery[0].mail;

                        const [emisorQuery] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id_emisor]);
                        const emisor = emisorQuery[0];

                        const [areaQuery] = await db.query('SELECT descripcion FROM areas WHERE id = ?', [emisor.id_area]);
                        const area = areaQuery[0].descripcion;
                        const [direccionQuery] = await db.query('SELECT descripcion FROM direcciones WHERE id = ?', [emisor.id_direccion]);
                        const direccion = direccionQuery[0].descripcion;
                        const date = capitalize(new Date(fecha_envio).toLocaleDateString('es-ES', {
                            weekday: 'long', year:
                                'numeric', month: 'long', day: 'numeric'
                        }));

                        const transporter = nodemailer.createTransport({
                            host: 'mail.complejojfi.gob.ar', // Cambia al servidor SMTP correspondiente
                            port: 25, // Puerto SMTP, podría ser 465 para SSL o 587 para STARTTLS
                            secure: false, // Cambiar a `true` si usas SSL
                            auth: {
                                user: process.env.MAIL_ACC, // Usuario del correo
                                pass: process.env.MAIL_PW, // Contraseña del correo
                            },
                            tls: {
                                rejectUnauthorized: false  // Ignorar el certificado autofirmado
                            }
                        });

                        const mailOptions = {
                            from: '"Notificaciones MDS" <notificaciones@mdssde.gob.ar>',
                            to: mail,
                            subject: 'Notificación de ' + [emisor.nombre],
                            html:
                                `<div style="box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); background-color: white; padding: 1cm 2.5cm 5px 2.5cm;">
            <div id="notificacion">
                <div style="margin-top: 5px; text-align: center;">
                <div style="display: flex; width: 100%; margin-bottom: 10px;">
                    <img style="max-height: 50px;" src="https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png" alt="">
                    <img style="max-height: 50px;margin-left:auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHEILRdMa_IWD8m1ym3F-YRJIrHsFHGlsjg&s" alt="">
                </div>
                <div style="font-size: 14px; text-align: start;color: #888;">NOTI-`+ [id_noti] + `</div>
                <div style="font-size: 14px; text-align: end;color: #888;">SANTIAGO DEL ESTERO</div>
                <div style="font-size: 14px; text-align: end;color: #888;">
                    `+ [date] + `
                </div>
                <h5 style="text-align: start;font-size: 22px;
            margin: 20px 0;
            font-weight: bold;">`+ [referencia] + `</h5>
                </div>
                <div>
                <hr />
                <div style="margin: 0 5%; padding: 20px;">
                    <div style="margin-top: 16px;">`+ [contenido] + `</div>
                </div>
                </div>
                <div style="font-size: 14px; margin-top: 16px;color: #888;">`+ [emisor.nombre] + `</div>
                <div style="font-size: 14px;color: #888;">`+ area + `</div>
                <div style="font-size: 14px; margin-bottom: 16px;color: #888;">`+ direccion + `</div>
            </div>
            </div>
        `,
                            attachments: req.files,
                        };
                        try {
                            const info = await transporter.sendMail(mailOptions);
                            console.log('Correo enviado:', info.messageId);
                        } catch (error) {
                            console.error('Error al enviar correo:', error);
                        }
                    }
                    catch (error) {
                        console.log('Error al mandar mail: ', error)
                    }

                }
            }
        }
        // Caso en el que se envía solo a un usuario específico
        else {
            if (id_emisor === parseInt(id_receptor)) {
                return res.status(400).json({ message: 'No puedes enviarte una notificación a ti mismo.' });
            }
            if (id_subarea) {
                const [result] = await db.query(
                    'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, id_subarea, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [tipo, id_emisor, id_direccion, id_area, id_subarea, referencia, contenido, fecha_envio]
                );

                id_noti = result.insertId;

                // Vincular al usuario receptor
                await db.query(
                    'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                    [id_noti, id_receptor, false]
                );
                try {
                    const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                        usuarioId: id_receptor,
                        payload,
                    });

                    if (respuestaPush.status === 200) {
                        console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                    } else {
                        console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                    }
                } catch (error) {
                    console.error(`Error al llamar a push-api:`, error);
                }
            } else {
                const [result] = await db.query(
                    'INSERT INTO notificaciones (tipo, id_emisor, id_direccion, id_area, referencia, contenido, fecha_envio) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [tipo, id_emisor, id_direccion, id_area, referencia, contenido, fecha_envio]
                );

                id_noti = result.insertId;

                // Vincular al usuario receptor
                await db.query(
                    'INSERT INTO noti_receptor (id_noti, id_receptor, leida) VALUES (?, ?, ?)',
                    [id_noti, id_receptor, false]
                );
                try {
                    const respuestaPush = await axios.post('http://localhost:3000/api/send-notification', {
                        usuarioId: id_receptor,
                        payload,
                    });

                    if (respuestaPush.status === 200) {
                        console.log(`Notificación push enviada al usuario ${normalizedReceptor}`);
                    } else {
                        console.error(`Error enviando notificación push: ${respuestaPush.statusText}`);
                    }
                } catch (error) {
                    console.error(`Error al llamar a push-api:`, error);
                }
            }
            try {
                const [telQuery] = await db.query('SELECT telefono FROM usuarios WHERE id = ?', [id_receptor]);
                const telefono = telQuery[0].telefono;

                const [emisorQuery] = await db.query('SELECT nombre FROM usuarios WHERE id = ?', [id_emisor]);
                const emisor = emisorQuery[0].nombre;
                // Aquí se envía la notificación por WhatsApp Business
                const whatsappResponse = await axios.post(
                    "https://graph.facebook.com/v21.0/589775480875611/messages",
                    {
                        messaging_product: "whatsapp",
                        to: '54' + telefono, // Reemplaza con el número de teléfono dinámico si es necesario
                        type: "template",
                        template: {
                            name: "notificacion", // Ajusta el nombre del template según tu configuración
                            language: {
                                code: "es_AR", // Ajusta el idioma según tu configuración
                            },
                            components: [
                                {
                                    type: "header",
                                    parameters: [{
                                        type: "image",
                                        image: {
                                            link: 'https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png'
                                        }
                                    }]
                                },
                                {
                                    type: "body",
                                    parameters: [
                                        {
                                            type: "text",
                                            text: [emisor].toString()
                                        },
                                        {
                                            type: "text",
                                            text: [referencia].toString()
                                        }
                                    ]
                                }]
                        },

                    },
                    {
                        headers: {
                            Authorization: `Bearer EAAIQ4mYW458BO3S1LnghDpieZCMiaM0RRPrGxyelXd2IBeeMC1KNzZB1N9XX2l3mdxjBC55zRbATlM2BofRhW6TQKZBG7ZBdIYMp9mzzE53Xe6QqJA07w0tvq58ZCFjY1TPNI4zk0B6hs8XnMZCGUnQfLuvenu7mw0nbQVpEOqTz6GJEdUJtnZBrWXc2NGdfOH5BIEtQqA3VMVu5Ors3Ww90tynEYEZD`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("WhatsApp Business API response:", whatsappResponse.data);
            } catch (error) {
                console.log('No se pudo obtener/enviar noti al telefono. ', error.response.data.error);
            }
            // Enviar notificación por correo
            try {

                const [mailQuery] = await db.query('SELECT mail FROM usuarios WHERE id = ?', [id_receptor]);
                const mail = mailQuery[0].mail;

                const [emisorQuery] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id_emisor]);
                const emisor = emisorQuery[0];

                const [areaQuery] = await db.query('SELECT descripcion FROM areas WHERE id = ?', [emisor.id_area]);
                const area = areaQuery[0].descripcion;
                const [direccionQuery] = await db.query('SELECT descripcion FROM direcciones WHERE id = ?', [emisor.id_direccion]);
                const direccion = direccionQuery[0].descripcion;
                const date = capitalize(new Date(fecha_envio).toLocaleDateString('es-ES', {
                    weekday: 'long', year:
                        'numeric', month: 'long', day: 'numeric'
                }));

                const transporter = nodemailer.createTransport({
                    host: 'mail.complejojfi.gob.ar', // Cambia al servidor SMTP correspondiente
                    port: 25, // Puerto SMTP, podría ser 465 para SSL o 587 para STARTTLS
                    secure: false, // Cambiar a `true` si usas SSL
                    auth: {
                        user: process.env.MAIL_ACC, // Usuario del correo
                        pass: process.env.MAIL_PW, // Contraseña del correo
                    },
                    tls: {
                        rejectUnauthorized: false  // Ignorar el certificado autofirmado
                    }
                });

                const mailOptions = {
                    from: '"Notificaciones MDS" <notificaciones@mdssde.gob.ar>',
                    to: mail,
                    subject: 'Notificación de ' + [emisor.nombre],
                    html:
                        `<div style="box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); background-color: white; padding: 1cm 2.5cm 5px 2.5cm;">
                        <div id="notificacion">
                            <div style="margin-top: 5px; text-align: center;">
                            <div style="display: flex; width: 100%; margin-bottom: 10px;">
                                <img style="max-height: 50px;" src="https://sn-mds.vercel.app/img/icono-mds-negro.9301a247.png" alt="">
                                <img style="max-height: 50px;margin-left:auto;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoHEILRdMa_IWD8m1ym3F-YRJIrHsFHGlsjg&s" alt="">
                            </div>
                            <div style="font-size: 14px; text-align: start;color: #888;">NOTI-`+ [id_noti] + `</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">SANTIAGO DEL ESTERO</div>
                            <div style="font-size: 14px; text-align: end;color: #888;">
                                `+ [date] + `
                            </div>
                            <h5 style="text-align: start;font-size: 22px;
                        margin: 20px 0;
                        font-weight: bold;">`+ [referencia] + `</h5>
                            </div>
                            <div>
                            <hr />
                            <div style="margin: 0 5%; padding: 20px;">
                                <div style="margin-top: 16px;">`+ [contenido] + `</div>
                            </div>
                            </div>
                            <div style="font-size: 14px; margin-top: 16px;color: #888;">`+ [emisor.nombre] + `</div>
                            <div style="font-size: 14px;color: #888;">`+ area + `</div>
                            <div style="font-size: 14px; margin-bottom: 16px;color: #888;">`+ direccion + `</div>
                        </div>
                        </div>
                    `,
                    attachments: req.files,
                };
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log('Correo enviado:', info.messageId);
                } catch (error) {
                    console.error('Error al enviar correo:', error);
                }
            }
            catch (error) {
                console.log('Error al mandar mail: ', error)
            }
        }

        // Renombrar y guardar los archivos
        if (archivos && archivos.length > 0) {
            for (let i = 0; i < archivos.length; i++) {
                const file = archivos[i];
                const ext = path.extname(file.originalname);
                const newFilename = `${id_noti}-${i + 1}_${file.originalname}`;
                const newPath = path.join(uploadDir, newFilename);

                if (fs.existsSync(file.path)) {
                    try {
                        fs.renameSync(file.path, newPath);
                        await db.query(
                            'INSERT INTO noti_adjunto (id_noti, path) VALUES (?, ?)',
                            [id_noti, newFilename]
                        );
                    } catch (err) {
                        console.error(`Error al renombrar archivo ${file.path} a ${newPath}`, err);
                    }
                }
            }
        }


        res.status(201).json({ message: 'Notificación enviada correctamente', idNoti: id_noti });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        res.status(500).json({ message: 'Error al enviar notificación' });
    }
});
// RESPONDER
router.post('/responder', upload.array('archivos'), async (req, res) => {
    const { id_noti, contenido, fecha_envio, usuarioId, esEmisor } = req.body;
    const archivos = req.files;
    try {
        const [result] = await db.query(
            'INSERT INTO noti_respuesta (id_noti, emisor, contenido, fecha_envio) VALUES (?, ?, ?, ?)',
            [id_noti, esEmisor == 'true' ? 1 : 0, contenido, fecha_envio]
        );
        if (esEmisor == 'true') {
            await db.query('UPDATE noti_receptor SET leida = 0, leida_emisor = 1 WHERE id_noti = ? AND id_receptor = ?', [id_noti, usuarioId]);
        } else {
            await db.query('UPDATE noti_receptor SET leida = 1, leida_emisor = 0 WHERE id_noti = ? AND id_receptor = ?', [id_noti, usuarioId]);
        }
        let id_respuesta = result.insertId;
        // Renombrar y guardar los archivos
        if (archivos && archivos.length > 0) {
            for (let i = 0; i < archivos.length; i++) {
                const file = archivos[i];
                const ext = path.extname(file.originalname);
                const newFilename = `${id_noti}-${i + 1}_${file.originalname}`;
                const newPath = path.join(uploadDir, newFilename);

                if (fs.existsSync(file.path)) {
                    try {
                        fs.renameSync(file.path, newPath);
                        await db.query(
                            'INSERT INTO respuesta_adjunto (id_respuesta, path) VALUES (?, ?)',
                            [id_respuesta, newFilename]
                        );
                    } catch (err) {
                        console.error(`Error al renombrar archivo ${file.path} a ${newPath}`, err);
                    }
                }
            }
        }

        res.status(201).json({ message: 'Notificación enviada correctamente' });
    } catch (error) {
        console.error('Error al enviar notificación:', error);
        res.status(500).json({ message: 'Error al enviar notificación' });
    }
});



module.exports = router; // Exportar el router