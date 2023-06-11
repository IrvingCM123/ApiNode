import pkg from 'pg';
const { Pool } = pkg;

// Configuración de la base de datos
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: '34.27.246.241',
  port: 5432,
  database: 'postgres',
  connectionConfig: {
    charset: 'UTF8'
  },
});

export { pool };
