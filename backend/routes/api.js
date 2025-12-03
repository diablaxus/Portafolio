import express from "express";
import { supabase } from "../config/database.js";

const router = express.Router();

// ==================== ENDPOINTS API ====================

// Obtener información del perfil
router.get('/profile', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .limit(1)
            .single();
        
        if (error) throw error;
        res.json(data || {});
    } catch (err) {
        console.error('Error en /profile:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener experiencia laboral
router.get('/experiencia', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('experiencia')
            .select('*')
            .order('fecha_inicio', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error en /experiencia:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener educación
router.get('/educacion', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('educacion')
            .select('*')
            .order('fecha_inicio', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error en /educacion:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener habilidades
router.get('/habilidades', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('habilidades')
            .select('*')
            .order('nivel', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error en /habilidades:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener proyectos
router.get('/proyectos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('proyectos')
            .select('*')
            .order('orden', { ascending: true })
            .order('fecha_inicio', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error en /proyectos:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener certificaciones
router.get('/certificaciones', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('certificaciones')
            .select('*')
            .order('orden', { ascending: true })
            .order('fecha_obtencion', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error en /certificaciones:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener idiomas
router.get('/idiomas', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('idiomas')
            .select('*')
            .order('orden', { ascending: true })
            .order('porcentaje', { ascending: false });
        
        if (error) throw error;
        res.json(data);
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
        const { data, error } = await supabase
            .from('contactos')
            .insert([{ nombre, email, mensaje }])
            .select();
        
        if (error) throw error;
        res.json({ 
            success: true, 
            message: 'Mensaje guardado exitosamente',
            id: data[0].id 
        });
    } catch (err) {
        console.error('Error en /contacto:', err);
        res.status(500).json({ error: err.message });
    }
});

// Obtener todos los mensajes de contacto (admin)
router.get('/contactos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('contactos')
            .select('*')
            .order('fecha', { ascending: false });
        
        if (error) throw error;
        res.json(data);
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
        const { error } = await supabase
            .from('profile')
            .update({ nombre, email, telefono, descripcion, foto_url })
            .eq('id', id);
        
        if (error) throw error;
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
        const { data, error } = await supabase
            .from('experiencia')
            .insert([{ empresa, cargo, fecha_inicio, fecha_fin, descripcion }])
            .select();
        
        if (error) throw error;
        res.json({ success: true, id: data[0].id });
    } catch (err) {
        console.error('Error en POST /experiencia:', err);
        res.status(500).json({ error: err.message });
    }
});

// Agregar nueva habilidad
router.post('/habilidades', async (req, res) => {
    const { nombre, nivel } = req.body;
    
    try {
        const { data, error } = await supabase
            .from('habilidades')
            .insert([{ nombre, nivel }])
            .select();
        
        if (error) throw error;
        res.json({ success: true, id: data[0].id });
    } catch (err) {
        console.error('Error en POST /habilidades:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
