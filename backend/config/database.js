// database.js
require('dotenv').config();
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: Falta la variable DATABASE_URL en Render o en tu .env");
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // obligatorio para Supabase desde Render
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});

// Probar la conexión sin bloquear el servidor
pool.connect()
    .then(client => {
        console.log('✅ Conectado correctamente a Supabase');
        client.release();
    })
    .catch(err => {
        console.error('❌ Error conectando a la base de datos:', err.message);
        // No hacemos process.exit, solo mostramos el error
    });

module.exports = pool;
