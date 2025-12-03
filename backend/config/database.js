require('dotenv').config();
const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
// PRIORIZA variables individuales (Render/Local) sobre DATABASE_URL (Supabase)
const useIndividualVars = process.env.DB_HOST || process.env.DB_USER || process.env.DB_NAME;

const config = useIndividualVars
    ? {
        // RENDER o LOCAL: Usa variables individuales
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'portafolio_db',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
    : {
        // SUPABASE: Usa DATABASE_URL
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };

const pool = new Pool(config);

// Probar conexión
pool.connect()
    .then(() => {
        const env = useIndividualVars ? 'Variables Individuales (Render/Local)' : 'DATABASE_URL (Supabase)';
        const dbName = process.env.DB_NAME || 'postgres';
        console.log(`✅ Conectado a PostgreSQL usando: ${env}`);
        console.log(`📊 Base de datos: ${dbName}`);
    })
    .catch(err => {
        console.error('❌ Error conectando a la base de datos:', err.message);
        console.error('💡 Verifica las credenciales en Render Dashboard o en .env');
    });

module.exports = pool;
