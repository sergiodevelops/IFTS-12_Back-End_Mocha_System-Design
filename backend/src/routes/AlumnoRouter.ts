import express from 'express';
import AlumnoController from '../controllers/AlumnoController';

const router = express.Router();

let alumnoController = new AlumnoController;

const alumnoMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    alumnoController = new AlumnoController;
    next();
}

router.use(alumnoMiddleware);

router.get('/', alumnoController.list);
router.post('/', alumnoController.create);
router.get('/:id', alumnoController.read);
router.put('/:id', alumnoController.update);
router.delete('/:id', alumnoController.delete);

export default router;
