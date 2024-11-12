import { servidor } from './config.js'
import { inicio } from "./rutas_backend/get/inicio.js"
import { login } from "./rutas_backend/get/login.js"
import { registro } from "./rutas_backend/get/registro.js"
import { registro_post } from "./rutas_backend/post/registro.js"
import { encriptar, generar_cookie } from "./controaldores/controladores.js"
import { login_post } from './rutas_backend/post/login.js'
import cookieParser from 'cookie-parser';  // Usamos cookie-parser para gestionar las cookies

// Agregar cookieParser al servidor
servidor.use(cookieParser());

// Rutas GET
servidor
  .get('/', inicio)  // Ruta para el inicio
  .get("/login", login)  // Ruta para la página de login
  .get("/registro", registro)  // Ruta para la página de registro
  .get("/carrito", (req, res) => {
    // Obtener el carrito desde las cookies, si existe
    const carrito = req.cookies.carrito || [];
    res.render('carrito', { carrito });  // Renderizamos la vista del carrito
  })

// Rutas POST
servidor
  .post("/registro", [encriptar], registro_post)  // Ruta para procesar el registro
  .post("/login", login_post)  // Ruta para procesar el login
  .post("/agregarCarrito", (req, res) => {
    const { modelo } = req.body;  // Obtener el modelo del producto
    const carrito = req.cookies.carrito || [];
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.modelo === modelo);
    if (productoExistente) {
      return res.status(400).send({ status: 'error', message: 'El producto ya está en el carrito' });
    }
    
    // Si no existe, agregarlo al carrito
    carrito.push({ modelo });
    res.cookie('carrito', carrito, { maxAge: 3600000, httpOnly: true });  // Guardamos el carrito en la cookie
    res.status(200).send({ status: 'ok', message: 'Producto agregado al carrito' });
  })
  .post("/eliminarCarrito", (req, res) => {
    const { modelo } = req.body;  // Obtener el modelo del producto a eliminar
    let carrito = req.cookies.carrito || [];
    carrito = carrito.filter(producto => producto.modelo !== modelo);  // Eliminar el producto del carrito
    res.cookie('carrito', carrito, { maxAge: 3600000, httpOnly: true });  // Actualizar la cookie con el carrito modificado
    res.status(200).send({ status: 'ok', message: 'Producto eliminado del carrito' });
  })
  .post("/comprar", (req, res) => {
    // Procesar la compra: por ahora solo vaciamos el carrito
    res.clearCookie('carrito');  // Limpiamos la cookie del carrito
    res.status(200).send({ status: 'ok', message: 'Compra realizada' });
  });
