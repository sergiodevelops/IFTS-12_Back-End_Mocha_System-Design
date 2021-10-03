import express from 'express';
import CarreraController from '../controllers/CarreraController';

const router = express.Router();

let carreraController = new CarreraController;

const carreraMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    carreraController = new CarreraController;
    next();
}

router.use(carreraMiddleware);

router.get('/', carreraController.list);
router.post('/', carreraController.create);
router.get('/:id', carreraController.read);
router.put('/:id', carreraController.update);
router.delete('/:id', carreraController.delete);

export default router;
