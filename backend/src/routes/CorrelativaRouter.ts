import express from 'express';
import CorrelativaController from '../controllers/CorrelativaController';

const router = express.Router();

let correlativaController = new CorrelativaController;

const correlativaMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    correlativaController = new CorrelativaController;
    next();
}

router.use(correlativaMiddleware);

router.post('/:carreraMateriaId', correlativaController.create);

export default router;
