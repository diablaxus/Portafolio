require('dotenv').config();
const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'portafolio_db',
    max: 20,                     // Número máximo de conexiones en el pool
    idleTimeoutMillis: 30000,    // Tiempo de espera antes de cerrar una conexión inactiva
    connectionTimeoutMillis: 2000 // Tiempo de espera para conectar
});

// Verificar conexión
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos PostgreSQL:', err.message);
        console.log('💡 Asegúrate de:');
        console.log('   1. Tener PostgreSQL instalado y corriendo');
        console.log('   2. Crear la base de datos: CREATE DATABASE portafolio_db;');
        console.log('   3. Ejecutar el archivo: psql -U postgres -d portafolio_db -f backend/database.sql');
        console.log('   4. Verificar las credenciales en el archivo .env');
    } else {
        console.log('✅ Conectado a la base de datos PostgreSQL');
        console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
        release(); // Liberar el cliente de vuelta al pool
    }
});

// Manejo de errores del pool
pool.on('error', (err, client) => {
    console.error('❌ Error inesperado en el pool de conexiones:', err);
});

module.exports = pool;
