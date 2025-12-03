// database.js
require('dotenv').config(); // ✅ cargar variables de entorno al inicio
const { Pool } = require('pg');

// Validar que exista la variable de entorno
if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: Falta la variable DATABASE_URL en Render o en tu .env");
    process.exit(1);
}

// Configuración del pool de PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // necesario para conectarse a Supabase desde Render
    },
    max: 20,          // máximo de conexiones en pool
    idleTimeoutMillis: 30000, // tiempo antes de cerrar conexiones inactivas
    connectionTimeoutMillis: 2000 // timeout para nuevas conexiones
});

// Función para probar la conexión al iniciar
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Conectado correctamente a Supabase');
        client.release(); // liberar conexión al pool
    } catch (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
        process.exit(1); // salir si no se puede conectar
    }
};

// Ejecutar prueba de conexión al importar
testConnection();

// Exportar pool para usarlo en otros módulos
module.exports = pool;
