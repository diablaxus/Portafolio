require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api', apiRoutes);

// Ruta principal - servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 SERVIDOR INICIADO CORRECTAMENTE');
    console.log('='.repeat(50));
    console.log(`📄 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
    console.log(`📁 Archivos estáticos: ../frontend`);
    console.log('='.repeat(50));
});

// Manejo de cierre limpio
process.on('SIGINT', async () => {
    console.log('\n\n⏹️  Cerrando servidor...');
    try {
        await pool.end();
        console.log('✅ Pool de conexiones cerrado');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error cerrando el pool:', err);
        process.exit(1);
    }
});

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
    console.error('❌ Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
});
