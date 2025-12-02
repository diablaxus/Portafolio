const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// ==================== ENDPOINTS API ====================

// Obtener información del perfil
router.get('/profile', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM profile LIMIT 1');
        res.json(result.rows[0] || {});
    } catch (err) {
        console.error('Error en /profile:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener experiencia laboral
router.get('/experiencia', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM experiencia ORDER BY fecha_inicio DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /experiencia:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener educación
router.get('/educacion', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM educacion ORDER BY fecha_inicio DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /educacion:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener habilidades
router.get('/habilidades', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM habilidades ORDER BY nivel DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /habilidades:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener proyectos
router.get('/proyectos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM proyectos ORDER BY orden ASC, fecha_inicio DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /proyectos:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener certificaciones
router.get('/certificaciones', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM certificaciones ORDER BY orden ASC, fecha_obtencion DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /certificaciones:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener idiomas
router.get('/idiomas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM idiomas ORDER BY orden ASC, porcentaje DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /idiomas:', err);
        res.status(500).json({ error: err.message });
    }
});

// Guardar mensaje de contacto
router.post('/contacto', async (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const query = 'INSERT INTO contactos (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING id';
        const result = await pool.query(query, [nombre, email, mensaje]);
        res.json({ 
            success: true, 
            message: 'Mensaje guardado exitosamente',
            id: result.rows[0].id 
        });
    } catch (err) {
        console.error('Error en /contacto:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener todos los mensajes de contacto (admin)
router.get('/contactos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contactos ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error en /contactos:', err);
        res.status(500).json({ error: err.message });
    }
});

// Actualizar información del perfil
router.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, descripcion, foto_url } = req.body;
    
    try {
        const query = 'UPDATE profile SET nombre=$1, email=$2, telefono=$3, descripcion=$4, foto_url=$5 WHERE id=$6';
        await pool.query(query, [nombre, email, telefono, descripcion, foto_url, id]);
        res.json({ success: true, message: 'Perfil actualizado' });
    } catch (err) {
        console.error('Error en PUT /profile:', err);
        res.status(500).json({ error: err.message });
    }
});

// Agregar nueva experiencia
router.post('/experiencia', async (req, res) => {
    const { empresa, cargo, fecha_inicio, fecha_fin, descripcion } = req.body;
    
    try {
        const query = 'INSERT INTO experiencia (empresa, cargo, fecha_inicio, fecha_fin, descripcion) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const result = await pool.query(query, [empresa, cargo, fecha_inicio, fecha_fin, descripcion]);
        res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error('Error en POST /experiencia:', err);
        res.status(500).json({ error: err.message });
    }
});

// Agregar nueva habilidad
router.post('/habilidades', async (req, res) => {
    const { nombre, nivel } = req.body;
    
    try {
        const query = 'INSERT INTO habilidades (nombre, nivel) VALUES ($1, $2) RETURNING id';
        const result = await pool.query(query, [nombre, nivel]);
        res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error('Error en POST /habilidades:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
