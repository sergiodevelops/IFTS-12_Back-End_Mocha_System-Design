import express from 'express';
import MateriaController from '../controllers/MateriaController';

const router = express.Router();

let materiaController = new MateriaController;

const materiaMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    materiaController = new MateriaController;
    next();
}

router.use(materiaMiddleware);

router.get('/', materiaController.list);
router.post('/', materiaController.create);
router.get('/:id', materiaController.read);
router.put('/:id', materiaController.update);
router.delete('/:id', materiaController.delete);

export default router;
