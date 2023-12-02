import pkg from 'pg';
const { Pool } = pkg;

// Configuración de la base de datos
const pool = new Pool({
  user: 'irving.condem',
  password: 'ROLfb7mx3gQl',
  host: 'ep-plain-bar-23424588.us-east-2.aws.neon.tech',
  port: 5432,
  database: 'student',
  ssl: {
    rejectUnauthorized: false,
  },
  connectionConfig: {
    charset: 'UTF8'
  },
  //user: 'postgres',
  //host: 'localhost',
  //database: 'SIAEFINAL',
  //password: '24042002',
  //port: 5432,
  //connectionConfig:{
  //  charset:'UTF8'
  //}
});

export { pool };
