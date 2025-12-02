require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const pool = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS - Permitir todos los orígenes en producción
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api', apiRoutes);

// Ruta principal - Servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Health check para Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Verificar conexión a la base de datos
pool.query('SELECT NOW()')
    .then(() => {
        console.log('✅ Conectado a la base de datos PostgreSQL');
        console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
    })
    .catch(err => console.error('❌ Error conectando a PostgreSQL:', err));

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
==================================================
🚀 SERVIDOR INICIADO CORRECTAMENTE
==================================================
📄 Frontend: http://localhost:${PORT}
🔌 API: http://localhost:${PORT}/api
📁 Archivos estáticos: ../frontend
🌍 Entorno: ${process.env.NODE_ENV || 'development'}
==================================================
    `);
});

// Manejo de cierre limpio
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM recibido. Cerrando servidor...');
    pool.end(() => {
        console.log('💾 Pool de PostgreSQL cerrado');
        process.exit(0);
    });
});