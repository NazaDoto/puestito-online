const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const configurarSocketIO = require('./socket');

// Configuración de CORS
const corsOptions = {
    origin: ['http://localhost:8080', 'https://e6f9-200-81-126-76.ngrok-free.app', 'https://sn-mds.vercel.app'], // Agrega tu frontend y la URL de ngrok
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
};

// Configurar la app de Express
const app = express();
const port = process.env.PORT || 3600;

// Middleware para solicitudes preflight
app.options('*', cors(corsOptions));

// Otros middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'routes', 'uploads')));

// Definición de rutas
const authRoutes = require('./routes/auth');
const direccionesRoutes = require('./routes/direcciones-crud');
const usuariosRoutes = require('./routes/user-crud');
const notificacionesRoutes = require('./routes/notificaciones-crud');
const pushApiRoutes = require('./routes/push-api');

// Uso de rutas
app.use('/', authRoutes);
app.use('/', direccionesRoutes);
app.use('/', usuariosRoutes);
app.use('/notificaciones', notificacionesRoutes);
app.use('/api', pushApiRoutes);

// Ruta para descarga de archivos
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'routes', 'uploads', req.params.filename);
    res.download(filePath, req.params.filename, (err) => {
        if (err) {
            res.status(500).send('No se pudo descargar el archivo.');
        }
    });
});

// Integrar Socket.IO y iniciar el servidor
const server = configurarSocketIO(app);
server.listen(port, () => {
    console.log(`Servidor ejecutándose en https://localhost:${port}`);
});
