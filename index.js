import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Server } from "./birbnb/server/server.js"
import { ClienteMongoDB } from "./birbnb/config/database.js";

import { NotificacionRepository } from "./birbnb/models/repositories/notificacionRepository.js";
import { NotificacionService } from "./birbnb/services/notificacionService.js";
import { NotificacionController } from "./birbnb/controllers/notificacionController.js";

import { AlojamientoRepository } from "./birbnb/models/repositories/alojamientoRepository.js";
//import { AlojamientoService } from "./birbnb/services/alojamientoService.js";
import { AlojamientoController } from "./birbnb/controllers/alojamientoController.js";

import { ReservaRepository } from "./birbnb/models/repositories/reservaRepository.js";
import { ReservaService } from "./birbnb/services/reservaService.js";
import { ReservaController } from "./birbnb/controllers/reservaController.js";

const app = express();
const port = process.env.PORT || 3000;
const server = new Server(app,port);

ClienteMongoDB.conectar();

const alojamientoRepository = new AlojamientoRepository();
//const alojamientoService = new AlojamientoService(alojamientoRepository);
const alojamientoController = new AlojamientoController(alojamientoRepository/* alojamientoService */);

const notificacionRepository = new NotificacionRepository();
const notificacionService = new NotificacionService(notificacionRepository);
const notificacionController = new NotificacionController(notificacionService);

const reservaRepository = new ReservaRepository();
const reservaService = new ReservaService(reservaRepository);
const reservaController = new ReservaController(reservaService);

server.setController(AlojamientoController, alojamientoController);
server.setController(NotificacionController, notificacionController);
server.setController(ReservaController, reservaController);

server.configureRoutes();
server.launch();