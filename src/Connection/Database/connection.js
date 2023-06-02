import pkg from 'pg';
const { Pool } = pkg;

// Configuración de la base de datos
const pool = new Pool({
  user: 'postgres',
  password: 'IrvingConde123',
  host: 'localhost',
  port: 5432,
  database: 'docentes',
  connectionConfig: {
    charset: 'UTF8'
  },
});

export { pool };
