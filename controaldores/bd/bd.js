// Conectar a la base de datos
import mysql from 'mysql2'

// Configura los detalles de tu conexión
const conectar = mysql.createConnection({
    host: process.env.ip,        // Cambia esto si tu base de datos está en otro host
    user: process.env.usuario,   // Tu nombre de usuario
    password: process.env.contra, // Tu contraseña
    database: process.env.bd      // El nombre de la base de datos a la que te quieres conectar
});
conectar.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack)
        return;
    }
    console.log('Conectado a la base de datos como ID ' + conectar.threadId)
});

export {
    conectar
} // Exporta la conexión para usarla en otros archivos