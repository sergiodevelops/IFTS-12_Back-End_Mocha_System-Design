import express from 'express';
import EvaluacionController from '../controllers/EvaluacionController';

const router = express.Router();

let evaluacionController = new EvaluacionController;

const evaluacionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    evaluacionController = new EvaluacionController;
    next();
}

router.use(evaluacionMiddleware);

router.post('/bulk', evaluacionController.createBulk);

export default router;
