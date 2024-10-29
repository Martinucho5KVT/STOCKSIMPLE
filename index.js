import { servidor } from './config.js'
import { inicio } from "./rutas_backend/get/inicio.js"
import { login } from "./rutas_backend/get/login.js"
import { registro } from "./rutas_backend/get/registro.js"
import { registro_post } from "./rutas_backend/post/registro.js"
import { encriptar, generar_cookie } from "./controaldores/controladores.js"
import { login_post } from './rutas_backend/post/login.js'
servidor
// Rutas GET
.get('/',inicio )
.get("/login",login)
.get("/registro",registro)

// Rutas POST
.post("/registro",[encriptar],registro_post)
.post("/login",login_post)