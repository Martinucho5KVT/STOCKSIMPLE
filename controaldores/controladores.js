import bcrypt from "bcryptjs";
import { agregarUsuario, buscarCorreo, buscar_usuario_contra } from "./bd/usuarios.js";

// Controlador para encriptar la contraseña y registrar un usuario
const encriptar = async (req, res, next) => {
    const { usuario, correo, contra, rep_contra } = req.body;

    // Verificar que las contraseñas coincidan
    if (contra !== rep_contra) {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    // Verificar si el correo ya está registrado
    buscarCorreo(correo, async (err, existe) => {
        if (err) {
            console.error("Error en la búsqueda del correo:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        } else if (existe) {
            return res.status(400).json({ error: "El correo ya está registrado" });
        }

        // Encriptar la contraseña y registrar el usuario
        const hash = await bcrypt.hash(contra, 10);
        agregarUsuario(usuario, correo, hash);
        next();
    });
};
// Controlador para el login
const login_post = async (req, res) => {
    const { usuario, contra } = req.body;

    // Buscar usuario y validar la contraseña
    buscar_usuario_contra(usuario, contra, (err, usuarioDB) => {
        if (err) {
            console.error("Error en el servidor:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (!usuarioDB) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        // Generar cookie para mantener la sesión
        res.cookie("usuario", usuarioDB.usuario, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 día
        });

        return res.status(200).json({ status: "ok", redirect: "/" });
    });
};


const generar_cookie = (req, res, next) => {
    const { usuario } = req.body;
    res.cookie("usuario", usuario, {
        httpOnly: true, // La cookie solo será accesible desde el servidor
        secure: process.env.NODE_ENV === "production", // Solo enviar a través de HTTPS en producción
        maxAge: 1000 * 60 * 60 * 24, // 1 día
    });
    next();
};
export {
    encriptar,
    login_post,
    generar_cookie,
};