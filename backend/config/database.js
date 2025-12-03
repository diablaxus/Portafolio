const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: Falta la variable DATABASE_URL en Render o en tu .env");
    process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // Esta opción fuerza usar solo IPv4
  host: process.env.DATABASE_URL.split('@')[1].split(':')[0],
});

pool.connect()
  .then(client => {
    console.log('✅ Conectado correctamente a Supabase (IPv4 forzado)');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error conectando a la base de datos:', err.message);
  });

module.exports = pool;
