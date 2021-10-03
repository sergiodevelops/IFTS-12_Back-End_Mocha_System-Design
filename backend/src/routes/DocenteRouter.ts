import express from 'express';
import DocenteController from '../controllers/DocenteController';

const router = express.Router();

let docenteController = new DocenteController;

const docenteMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    docenteController = new DocenteController;
    next();
}

router.use(docenteMiddleware);

router.get('/', docenteController.list);
router.post('/', docenteController.create);
router.get('/:id', docenteController.read);
router.put('/:id', docenteController.update);
router.delete('/:id', docenteController.delete);

export default router;
