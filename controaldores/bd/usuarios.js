import { conectar } from "./bd.js"
// Función para agregar un nuevo usuario
const agregarUsuario = (nombre, correo, contra) => {
    const sql =  'INSERT INTO usuarios (usuario, correo, contra) VALUES (?, ?, ?)';
    const valores = [nombre, correo, contra];

    conectar.query(sql, valores, (err, results) => {
        if (err) {
            console.error('Error al agregar el usuario:', err);
            return;
        }
        console.log('Usuario agregado con ID:', results.insertId);
    });
}
const buscarCorreo = (correo, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    conectar.query(sql, [correo], (err, results) => {
        if (err) {
            console.error('Error al buscar el correo:', err);
            return callback(err, null);
        }

        // Si el correo existe en la base de datos, results tendrá filas
        if (results.length > 0) {
            console.log('El correo ya existe:', correo);
            return callback(null, true); // El correo existe
        } else {
            console.log('El correo no existe:', correo);
            return callback(null, false); // El correo no existe
        }
    });
}
const buscar_usuario_contra = (usuario, contra, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';  // Busca por el nombre de usuario
    conectar.query(sql, [usuario], async (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err)
            return callback(err, null)
        }

        if (results.length === 0) {
            console.log('Usuario no encontrado:', usuario);
            return callback(null, false); // Usuario no encontrado
        }

        const usuarioDB = results[0]

        // Compara la contraseña ingresada con la contraseña encriptada en la base de datos
        const match = await bcrypt.compare(contra, usuarioDB.contra);

        if (match) {
            console.log('Contraseña correcta');
            return callback(null, usuarioDB); // Si la contraseña es correcta, retorna el usuario
        } else {
            console.log('Contraseña incorrecta');
            return callback(null, false); // Si la contraseña es incorrecta
        }
    })
}
export{
    agregarUsuario,
    buscarCorreo,
    buscar_usuario_contra
}