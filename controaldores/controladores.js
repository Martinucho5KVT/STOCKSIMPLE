import  bcrypt from "bcryptjs"
import { agregarUsuario, buscarCorreo, buscar_usuario_contra } from "./bd/usuarios.js"

const encriptar = async(req,res,next)=>{
   let { usuario,correo,contra } = req.body
   buscarCorreo (correo, async(err, existe) => {
    if (err) {
        console.error("Error en la búsqueda del correo:", err);
    } else if (existe) {
        console.log("El correo ya está registrado.");
    } else {
        console.log("El correo no está registrado, puedes agregarlo.");
        let vuelta_llave=10
        const hash = await bcrypt.hash(contra, vuelta_llave);
        agregarUsuario(usuario,correo,hash)
        next()
        return hash         
    }
})
   
}

const generar_cookie = (req, res, next) => {
    const { usuario } = req.body;
    res.cookie("usuario", usuario, {
        httpOnly: true, // Para mayor seguridad
        secure: process.env.NODE_ENV === "production", // Solo enviar a través de HTTPS en producción
        maxAge: 1000 * 60 * 60 * 24, // 1 día
    });
    next()
}
export{
    encriptar,
    generar_cookie,
    
}