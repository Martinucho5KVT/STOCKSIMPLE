// config.js
import express from 'express';
import morgan from 'morgan';
import hbs from 'hbs';
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from 'dotenv';
import { createServer } from 'http'; // 👈 necesario para usar Socket.IO
import { Server as SocketIOServer } from 'socket.io'; // 👈 Socket.IO

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const servidor = express();
const httpServer = createServer(servidor); // 👈 creamos servidor HTTP
const io = new SocketIOServer(httpServer); // 👈 inicializamos Socket.IO

// Configuración básica
servidor.set('puerto', process.env.PORT || 80 || 8080);
servidor.use(express.json());
servidor.use(morgan('dev'));
servidor.use(express.static(`${__dirname}/publicos`));
servidor.use("/css", express.static(`${__dirname}/node_modules/bootstrap/dist/css`));
servidor.use("/js", express.static(`${__dirname}/node_modules/bootstrap/dist/js`));
servidor.set("view engine", "hbs");
hbs.registerPartials(`${__dirname}/views/partials`);

// Escuchar conexiones con Socket.IO
io.on('connection', (socket) => {
    console.log('🔌 Cliente conectado:', socket.id);

    socket.emit('mensaje', '¡Bienvenido al servidor WebSocket!');

    socket.on('disconnect', () => {
        console.log('❌ Cliente desconectado:', socket.id);
    });
});

// Exportamos el servidor Express y el HTTP server
export {
    servidor,
    httpServer, // 👈 esto lo vas a usar en `index.js`
    io // si querés usarlo en otras partes
};