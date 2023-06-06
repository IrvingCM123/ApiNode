import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 3000,
  dbPort: process.env.DB_PORT || 5432,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbServer: process.env.DB_SERVER || 'localhost',
  dbDatabase: process.env.DB_DATABASE,
};
