require('dotenv').config(); // cargar variables de entorno
const express = require('express');
const pool = require('./config/database'); // importamos nuestro pool de conexiones

const app = express();
app.use(express.json()); // parsear JSON en requests

const PORT = process.env.PORT || 10000;

// ============================
// Rutas de prueba
// ============================

// Ruta raíz
app.get('/', (req, res) => {
    res.send('🌐 Servidor corriendo correctamente');
});

// Ruta de prueba con base de datos
app.get('/api/usuarios', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM usuarios LIMIT 10;');
        res.json(rows);
    } catch (err) {
        console.error('❌ Error al consultar usuarios:', err.message);
        res.status(500).json({ error: 'Error al consultar usuarios' });
    }
});

// ============================
// Iniciar servidor
// ============================
app.listen(PORT, () => {
    console.log('==================================================');
    console.log('🚀 SERVIDOR INICIADO CORRECTAMENTE');
    console.log(`📄 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
    console.log('==================================================');
});
