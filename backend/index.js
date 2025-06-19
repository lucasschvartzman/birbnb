import { App } from "./App.js"

const birbnb = new App();

birbnb.iniciar().catch(error => {
    console.error(`Error inicializando la aplicación`, error);
    process.exit(1);
});
