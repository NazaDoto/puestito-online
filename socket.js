const https = require('https'); // Necesario para Socket.IO
const { Server } = require('socket.io'); // Socket.IO
const fs = require("fs");

const usuariosConectados = new Map();

/**
 * Configura y gestiona los eventos de Socket.IO
 * @param {Object} app - La instancia de Express
 */
function configurarSocketIO(app) {

    const options = {
        key: fs.readFileSync("/var/www/ssl/puestito.online.key"),
        cert: fs.readFileSync("/var/www/ssl/puestito.online.crt")
    };
    const httpsServer = https.createServer(options, app);
    
    // Integrar Socket.IO con el servidor HTTP
    const io = new Server(server, {
        cors: {
            origin: ['*', 'https://sn-mds.vercel.app', 'http://localhost:8080'], // Permite conexiones de cualquier origen
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'], // Encabezados permitidos
            credentials: true, // Permitir credenciales
        },
    });

    io.on('connection', (socket) => {
        const { usuarioId } = socket.handshake.query;
        const normalizedUsuarioId = String(usuarioId); // Normalizar a string
        console.log(`Cliente conectado: ${socket.id}, usuarioId: ${normalizedUsuarioId}`);

        if (normalizedUsuarioId) {
            usuariosConectados.set(normalizedUsuarioId, socket.id);
            console.log('Usuarios conectados:', Object.fromEntries(usuariosConectados));
        }

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

    return server; // Retornar el servidor HTTP para iniciar la app
}

module.exports = configurarSocketIO;
