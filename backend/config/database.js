require('dotenv').config();
const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
// Funciona con DATABASE_URL (Supabase/Render) o variables individuales (Local)
const config = process.env.DATABASE_URL 
    ? {
        // PRODUCCIÓN: Supabase con DATABASE_URL
        connectionString: process.env.DATABASE_URL,
        ssl: { 
            rejectUnauthorized: false 
        },
        // Configuración para evitar problemas con IPv6
        connectionTimeoutMillis: 10000,
    }
    : {
        // DESARROLLO LOCAL: Variables individuales
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'portafolio_db',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };

const pool = new Pool(config);

// Probar conexión al iniciar
pool.connect()
    .then((client) => {
        const env = process.env.DATABASE_URL ? 'Supabase' : 'Local PostgreSQL';
        console.log(`✅ Conectado a ${env}`);
        console.log(`📊 Base de datos configurada correctamente`);
        client.release();
    })
    .catch(err => {
        console.error('❌ Error conectando a la base de datos:', err.message);
        console.error('💡 Verifica las credenciales de Supabase o PostgreSQL local');
        // No forzar exit para que Render pueda mostrar logs
    });

// Manejo de errores del pool
pool.on('error', (err) => {
    console.error('❌ Error inesperado en el pool de conexiones:', err.message);
});

module.exports = pool;
