const https = require('https'); // Necesario para Socket.IO
const { Server } = require('socket.io'); // Socket.IO
const fs = require("fs");

const usuariosConectados = new Map();

/**
 * Configura y gestiona los eventos de Socket.IO
 * @param {Object} app - La instancia de Express
 */
function configurarSocketIO(app) {

    // Ruta de los certificados SSL
    const options = {
        key: fs.readFileSync("/var/www/ssl/puestito.online.key"),
        cert: fs.readFileSync("/var/www/ssl/puestito.online.crt")
    };

    // Crear servidor HTTPS
    const server = https.createServer(options, app);
    
    // Configurar Socket.IO
    const io = new Server(server, {
    });

    // Manejar la conexión de los sockets
    io.on('connection', (socket) => {
        const { usuarioId } = socket.handshake.query;
        const normalizedUsuarioId = String(usuarioId); // Normalizar a string
        console.log(`Cliente conectado: ${socket.id}, usuarioId: ${normalizedUsuarioId}`);

        if (normalizedUsuarioId) {
            usuariosConectados.set(normalizedUsuarioId, socket.id);
            console.log('Usuarios conectados:', Object.fromEntries(usuariosConectados));
        }

        // Enviar notificaciones
        socket.on('enviar-notificacion', async (receptor) => {
            const normalizedReceptor = String(receptor);
            console.log(`Notificación para usuario: ${normalizedReceptor}`);

            const receptorSocketId = usuariosConectados.get(normalizedReceptor);
            if (receptorSocketId) {
                io.to(receptorSocketId).emit('nueva-notificacion');
                console.log(`Notificación enviada a usuario ${normalizedReceptor}`);
            } else {
                console.log(`Usuario ${normalizedReceptor} no está conectado. Enviando notificación push...`);
            }
        });

        // Enviar respuestas
        socket.on('enviar-respuesta', async (receptor) => {
            const normalizedReceptor = String(receptor);
            console.log(`Respuesta para usuario: ${normalizedReceptor}`);

            const receptorSocketId = usuariosConectados.get(normalizedReceptor);
            if (receptorSocketId) {
                io.to(receptorSocketId).emit('nueva-respuesta');
                console.log(`Respuesta enviada a usuario ${normalizedReceptor}`);
            } else {
                console.log(`Usuario ${normalizedReceptor} no está conectado. Enviando notificación push...`);
            }
        });

        // Manejar desconexión
        socket.on('disconnect', () => {
            let desconectadoUsuarioId = null;
            usuariosConectados.forEach((id, key) => {
                if (id === socket.id) {
                    desconectadoUsuarioId = key;
                }
            });
            if (desconectadoUsuarioId) {
                usuariosConectados.delete(desconectadoUsuarioId);
            }
            console.log(`Cliente desconectado: ${socket.id}`);
            console.log('Usuarios conectados después de desconexión:', Object.fromEntries(usuariosConectados));
        });
    });

    return server; // Retornar el servidor HTTPS
}

module.exports = configurarSocketIO;
