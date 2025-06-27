import dotenv from 'dotenv';
dotenv.config();
import pool from './db.js';
import { io, servidor, httpServer } from './config.js'; // Mejor juntar imports de un mismo archivo
import { inicio } from "./rutas_backend/get/inicio.js";
import { login } from "./rutas_backend/get/login.js";
import { registro } from "./rutas_backend/get/registro.js";
import { registro_post } from "./rutas_backend/post/registro.js";
import { encriptar, generar_cookie } from "./controaldores/controladores.js";
import { login_post } from './rutas_backend/post/login.js';
import cookieParser from 'cookie-parser';

// Test de conexión a la base de datos
async function testConexion() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Test de conexión OK:', rows);
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
  }
}
testConexion();

// Middleware para gestionar cookies
servidor.use(cookieParser());

// Rutas GET
servidor
  .get('/', inicio)
  .get("/login", login)
  .get("/registro", registro)
  .get("/carrito", (req, res) => {
    const carrito = req.cookies.carrito || [];
    res.render('carrito', { carrito });
  });

// Rutas POST
servidor
  .post("/registro", [encriptar], registro_post)
  .post("/login", login_post)
  .post("/agregarCarrito", (req, res) => {
    const { modelo } = req.body;
    const carrito = req.cookies.carrito || [];

    const productoExistente = carrito.find(producto => producto.modelo === modelo);
    if (productoExistente) {
      return res.status(400).send({ status: 'error', message: 'El producto ya está en el carrito' });
    }

    carrito.push({ modelo });
    res.cookie('carrito', carrito, { maxAge: 3600000, httpOnly: true });
    res.status(200).send({ status: 'ok', message: 'Producto agregado al carrito' });

    io.emit('productoAgregado', { modelo });
  })
  .post("/eliminarCarrito", (req, res) => {
    const { modelo } = req.body;
    let carrito = req.cookies.carrito || [];
    carrito = carrito.filter(producto => producto.modelo !== modelo);
    res.cookie('carrito', carrito, { maxAge: 3600000, httpOnly: true });
    res.status(200).send({ status: 'ok', message: 'Producto eliminado del carrito' });
  })
  .post("/comprar", (req, res) => {
    res.clearCookie('carrito');
    res.status(200).send({ status: 'ok', message: 'Compra realizada' });
  });

// Iniciar el servidor
const PORT = process.env.PORT || 80;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
