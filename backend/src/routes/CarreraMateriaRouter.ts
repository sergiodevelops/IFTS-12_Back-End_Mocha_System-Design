import express from 'express';
import CarreraMateriaController from '../controllers/CarreraMateriaController';

const router = express.Router();

let carreraMateriaController = new CarreraMateriaController;

const carreraMateriaMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    carreraMateriaController = new CarreraMateriaController;
    next();
}

router.use(carreraMateriaMiddleware);

router.get('/', carreraMateriaController.list);
router.get('/:id', carreraMateriaController.read);
router.post('/', carreraMateriaController.create);
router.delete('/:id', carreraMateriaController.delete);

export default router;
