import express from "express";
import {registerRoutes} from "../routes/index.js";

export class Server {
    #controllers = {};
    #app;
    #port;

    constructor(app, port) {
        this.#app = app;
        this.#port = port;
        this.#app.use(express.json());
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
        registerRoutes(this.#app,this.getController.bind(this));
        // NOTA: El Middleware se pone aca.
    }

    launch() {
        this.#app.listen(this.#port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.#port}`);
        });
    }
}