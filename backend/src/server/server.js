import express from "express";
import cors from "cors";
import {registerRoutes} from "../routes/index.js";
import { setSwagger as initializeSwagger } from "../config/swaggerConfig.js";
import { notFoundHandler } from "../middlewares/notFoundHandler.js";
import { exceptionHandler } from "../middlewares/exceptionHandler.js";
import { MongooseMiddlewares } from "../middlewares/mongooseMiddleware.js";

export class Server {
    #controllers = {};
    #app;
    #port;

    constructor(app, port) {
        this.#app = app;
        this.#port = port;
        this.#app.use(express.json());
        this.#app.use(cors({
            origin: process.env.FRONTEND_URL,
            credentials: true
        }))
    }

    setController(controllerClass, controller) {
        this.#controllers[controllerClass.name] = controller;
    }

    getController(controllerClass) {
        const controller = this.#controllers[controllerClass.name];
        if (!controller) {
            throw new Error("Falta un controller en la ruta especificada.");
        }
        return controller;
    }

    configureRoutes() {
        this.#app.param('id', MongooseMiddlewares.validateObjectIdParam); // Middleware para validar formato de ObjectIDs
        registerRoutes(this.#app,this.getController.bind(this));
        this.#setSwagger();
        this.#app.use(notFoundHandler); // Middleware para rutas no encontradas.
        this.#app.use(exceptionHandler); // Middleware para catcheo de excepciones.
    }

    #setSwagger() {
        initializeSwagger(this.#app);
    }

    launch() {
        this.#app.listen(this.#port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.#port}`);
        });
    }
}