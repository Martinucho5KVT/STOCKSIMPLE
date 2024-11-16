import { conectar } from "./bd.js";
import bcrypt from 'bcryptjs';

// Agregar un nuevo usuario a la base de datos
const agregarUsuario = (nombre, correo, contra) => {
    const sql = 'INSERT INTO usuarios (usuario, correo, contra) VALUES (?, ?, ?)';
    const valores = [nombre, correo, contra];

    conectar.query(sql, valores, (err, results) => {
        if (err) {
            console.error("Error al agregar el usuario:", err);
            return;
        }
        console.log("Usuario registrado con éxito:", results.insertId);
    });
};

// Buscar un usuario por correo
const buscarCorreo = (correo, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    conectar.query(sql, [correo], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results.length > 0);
    });
};

// Buscar usuario por nombre y validar contraseña
const buscar_usuario_contra = (usuario, contra, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    conectar.query(sql, [usuario], async (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, false);

        const usuarioDB = results[0];
        const match = await bcrypt.compare(contra, usuarioDB.contra);
        return callback(null, match ? usuarioDB : false);
    });
};

export {
    agregarUsuario,
    buscarCorreo,
    buscar_usuario_contra
};