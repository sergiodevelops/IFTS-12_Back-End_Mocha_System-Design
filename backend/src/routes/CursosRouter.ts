import express from 'express';
import CursoController from '../controllers/CursoController';

const router = express.Router();

let cursoController = new CursoController;

const cursoMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cursoController = new CursoController;
    next();
}

router.use(cursoMiddleware);

router.get('/', cursoController.list);
router.post('/', cursoController.create);
router.get('/:id', cursoController.read);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.delete);
router.get('/evaluaciones/all', cursoController.getEvaluaciones);
router.get('/evaluaciones/:id', cursoController.getEvaluacionesByCurso);

export default router;
