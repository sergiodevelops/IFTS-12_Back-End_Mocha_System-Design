import express from 'express';
import CursoAlumnoController from '../controllers/CursoAlumnoController';

const router = express.Router();

let cursoAlumnoController = new CursoAlumnoController;

const carreraMateriaDocenteMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cursoAlumnoController = new CursoAlumnoController;
    next();
}

router.use(carreraMateriaDocenteMiddleware);

router.get('/', cursoAlumnoController.list);
router.post('/', cursoAlumnoController.create);
router.get('/:id', cursoAlumnoController.read);
router.put('/:id', cursoAlumnoController.update);
router.delete('/:id', cursoAlumnoController.delete);

export default router;
