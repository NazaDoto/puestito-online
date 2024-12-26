const express = require('express');
const webPush = require('web-push');
const db = require('../db');

const router = express.Router();

// Claves VAPID generadas previamente
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
// Configuración de web-push
webPush.setVapidDetails(
    'mailto:tu-email@example.com', // Cambia a tu correo de contacto
    publicVapidKey,
    privateVapidKey
);

/**
 * Guardar una nueva suscripción Push.
 */
router.post('/save-subscription', async (req, res) => {
    console.log('entra aki')
    console.log('usuarioId: ', usuarioId, 'suscription: ', subscription);
    if (!usuarioId || !subscription || !subscription.endpoint || !subscription.keys || !subscription.keys.p256dh || !subscription.keys.auth) {
        return res.status(400).json({ error: 'Usuario ID y suscripción válidos son requeridos' });
    }

    const { endpoint } = subscription;
    const { p256dh, auth } = subscription.keys;

    try {
        const [rows] = await db.query('SELECT * FROM api_suscripciones WHERE id_usuario = ?', [usuarioId]);
        if (rows.length > 0) {
            // El usuario ya tiene una suscripción, actualizamos los datos
            await db.query(`
                UPDATE api_suscripciones 
                SET suscripcion_endpoint = ?, suscripcion_key = ?, suscripcion_auth = ? 
                WHERE id_usuario = ?
            `, [endpoint, p256dh, auth, usuarioId]);

            return res.status(200).json({ message: 'Suscripción actualizada exitosamente' });
        } else {
            // El usuario no tiene una suscripción, insertamos los datos
            await db.query(`
                INSERT INTO api_suscripciones (id_usuario, suscripcion_endpoint, suscripcion_key, suscripcion_auth) 
                VALUES (?, ?, ?, ?)
            `, [usuarioId, endpoint, p256dh, auth]);

            return res.status(200).json({ message: 'Suscripción guardada exitosamente' });
        }
    } catch (err) {
        console.error('Error al guardar la suscripción:', err);
        return res.status(500).json({ error: 'Hubo un error al guardar la suscripción' });
    }
});

/**
 * Enviar una notificación push a un usuario específico.
 */
router.post('/send-notification', async (req, res) => {
    const { usuarioId, payload } = req.body;

    if (!usuarioId || !payload) {
        return res.status(400).json({ error: 'Usuario ID y el payload de la notificación son requeridos' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM api_suscripciones WHERE id_usuario = ?', [usuarioId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: `No se encontró una suscripción para el usuario ${usuarioId}` });
        }

        const { suscripcion_endpoint: endpoint, suscripcion_key: p256dh, suscripcion_auth: auth } = rows[0];

        const subscription = {
            endpoint,
            keys: { p256dh, auth }
        };

        // Enviar notificación push
        await webPush.sendNotification(subscription, JSON.stringify(payload));
        console.log(`Notificación enviada a usuario ${usuarioId}`);
        res.status(200).json({ message: 'Notificación enviada exitosamente' });
    } catch (error) {
        console.error(`Error enviando notificación a usuario ${usuarioId}:`, error);
        res.status(500).json({ error: 'Error enviando notificación' });
    }
});

/**
 * Obtener todas las suscripciones (solo para pruebas o depuración).
 */
router.get('/subscriptions', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM api_suscripciones');

        const todasSuscripciones = rows.map((row) => ({
            usuarioId: row.id_usuario,
            subscription: {
                endpoint: row.suscripcion_endpoint,
                keys: {
                    p256dh: row.suscripcion_key,
                    auth: row.suscripcion_auth
                }
            }
        }));

        res.status(200).json(todasSuscripciones);
    } catch (err) {
        console.error('Error al obtener las suscripciones:', err);
        res.status(500).json({ error: 'Hubo un error al obtener las suscripciones' });
    }
});

module.exports = router;
