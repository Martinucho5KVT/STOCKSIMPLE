import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conectar = mysql.createConnection({
  host: process.env.ip || '127.0.0.1',
  user: process.env.usuario,
  password: process.env.contra,
  database: process.env.bd,
  port: process.env.puerto ? Number(process.env.puerto) : 3306,
});

conectar.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como ID ' + conectar.threadId);
});

export { conectar };