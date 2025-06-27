import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.ip || '127.0.0.1',
  user: process.env.usuario,
  password: process.env.contra,
  database: process.env.bd,
  port: process.env.puerto ? Number(process.env.puerto) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
