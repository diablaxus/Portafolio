import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "./config/database.js";
import apiRouter from "./routes/api.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;

// ============================
// Servir archivos estáticos del frontend (build de React)
// ============================
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ============================
// Rutas de la API
// ============================
app.use('/api', apiRouter);

// ============================
// Rutas de prueba
// ============================

// Health check
app.get('/health', async (req, res) => {
    try {
        // Verificar conexión con Supabase
        const { data, error } = await supabase.from('profile').select('count').limit(1);
        if (error) throw error;
        res.json({ 
            status: 'ok', 
            database: 'connected',
            timestamp: new Date().toISOString() 
        });
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            database: 'disconnected',
            error: err.message 
        });
    }
});

// Todas las demás rutas devuelven la app de React (SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// ============================
// Iniciar servidor
// ============================
app.listen(PORT, () => {
    console.log('==================================================');
    console.log('🚀 SERVIDOR INICIADO CORRECTAMENTE');
    console.log(`📄 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API: http://localhost:${PORT}/api`);
    console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log('==================================================');
});
