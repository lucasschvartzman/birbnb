import dotenv from "dotenv";
import express from "express";
import { Server } from "./server/server.js";
import { MongoDBClient } from "./config/database.js";

// Repositories
import { NotificacionRepository } from "./models/repositories/notificacionRepository.js";
import { AlojamientoRepository } from "./models/repositories/alojamientoRepository.js";
import { ReservaRepository } from "./models/repositories/reservaRepository.js";

// Services
import { NotificacionService } from "./services/notificacionService.js";
import { ReservaService } from "./services/reservaService.js";
// import { AlojamientoService } from "./birbnb/services/alojamientoService.js";

// Controllers
import { NotificacionController } from "./controllers/notificacionController.js";
import { AlojamientoController } from "./controllers/alojamientoController.js";
import { ReservaController } from "./controllers/reservaController.js";
import { NotificacionFactory } from "./models/factories/NotificacionFactory.js";
import { UsuarioModel } from "./models/schemas/usuarioSchema.js";

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
        try {
            await this.conectarAMongo();
            this.cargarContexto();
            this.configurarServidor();
            await this.lanzar();
        } catch (error) {
            console.error('Error durante la inicialización:', error);
            process.exit(1);
        }
    }

    async conectarAMongo() {
        await MongoDBClient.connect();
    }

    cargarContexto() {
        const alojamientoRepository = new AlojamientoRepository();
        const notificacionRepository = new NotificacionRepository();
        const reservaRepository = new ReservaRepository();
        const notificacionFactory = NotificacionFactory;
        const usuarioModel = UsuarioModel;

        const notificacionService = new NotificacionService(notificacionRepository, usuarioModel);
        const reservaService = new ReservaService(reservaRepository, alojamientoRepository,
            notificacionRepository, notificacionFactory, usuarioModel);
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