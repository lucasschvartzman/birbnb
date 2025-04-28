import { Router } from "express";
import { NotificacionController } from '../controllers/notificacionController.js'; 

const router = Router();
const notificacionController = new NotificacionController();

router.get('/notificaciones', notificacionController.getAllNotificaciones);
router.post('/notificaciones', notificacionController.createNotificacion);
router.delete('/notificaciones/:id', notificacionController.deleteNotificacion);
//tiene sentido agregar el put de notis?

export default router;
