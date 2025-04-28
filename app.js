import express from "express";

import health from "./routes/Health.js";
import notificacionRoutes from "./routes/notificacionRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Default
app.get('/', (req, res) => {
    res.status(200).send('¡Hola Mundo!');
})

// Health Check Endpoint
app.use('/', health);
app.use('/api', notificacionRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});