import express from 'express';
import TurnoController from '../controllers/TurnoController';

const router = express.Router();

let turnoController = new TurnoController;

const carreraMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    turnoController = new TurnoController;
    next();
}

router.use(carreraMiddleware);

router.get('/', turnoController.list);

export default router;
