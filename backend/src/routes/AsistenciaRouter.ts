import express from 'express';
import AsistenciaController from '../controllers/AsistenciaController';

const router = express.Router();

let asistenciaController = new AsistenciaController;

const asistenciaMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    asistenciaController = new AsistenciaController;
    next();
}

router.use(asistenciaMiddleware);

router.post('/bulk', asistenciaController.createBulk);

export default router;
