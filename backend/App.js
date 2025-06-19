import dotenv from "dotenv";
import express from "express";
import { Server } from "./src/server/server.js";
import { MongoDBClient } from "./src/config/database.js";

// Repositories
import { NotificacionRepository } from "./src/models/repositories/notificacionRepository.js";
import { AlojamientoRepository } from "./src/models/repositories/alojamientoRepository.js";
import { ReservaRepository } from "./src/models/repositories/reservaRepository.js";

// Services
import { NotificacionService } from "./src/services/notificacionService.js";
import { ReservaService } from "./src/services/reservaService.js";

// Controllers
import { NotificacionController } from "./src/controllers/notificacionController.js";
import { AlojamientoController } from "./src/controllers/alojamientoController.js";
import { ReservaController } from "./src/controllers/reservaController.js";
import {UsuarioRepository} from "./src/models/repositories/usuarioRepository.js";
import {UsuarioService} from "./src/services/usuarioService.js";

const DEFAULT_PORT = 3000;

export class App {
    constructor() {
        dotenv.config();
        this.app = express();
        this.port = process.env.PORT || DEFAULT_PORT;
        this.server = null;
        this.controllers = new Map();
    }

    async iniciar() {
        await this.conectarAMongo();
        this.cargarContexto();
        this.configurarServidor();
        await this.lanzar();
    }

    async conectarAMongo() {
        await MongoDBClient.connect();
    }

    cargarContexto() {
        const alojamientoRepository = new AlojamientoRepository();
        const notificacionRepository = new NotificacionRepository();
        const reservaRepository = new ReservaRepository();
        const usuarioRepository = new UsuarioRepository();

        const usuarioService = new UsuarioService(usuarioRepository);
        const notificacionService = new NotificacionService(notificacionRepository, alojamientoRepository, usuarioService);
        const reservaService = new ReservaService(reservaRepository, alojamientoRepository,
          notificacionService, usuarioService);
        // const alojamientoService = new AlojamientoService(alojamientoRepository);

        const alojamientoController = new AlojamientoController(alojamientoRepository);
        const notificacionController = new NotificacionController(notificacionService);
        const reservaController = new ReservaController(reservaService);

        this.controllers.set(AlojamientoController, alojamientoController);
        this.controllers.set(NotificacionController, notificacionController);
        this.controllers.set(ReservaController, reservaController);
    }

    configurarServidor() {
        this.server = new Server(this.app, this.port);
        for (const [controllerClass, controllerInstance] of this.controllers) {
            this.server.setController(controllerClass, controllerInstance);
        }
        this.server.configureRoutes();
    }

    async lanzar() {
        await this.server.launch();
    }
}
