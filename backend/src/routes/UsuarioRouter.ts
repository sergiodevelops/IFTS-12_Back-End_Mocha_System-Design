import express from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = express.Router();

let usuarioController = new UsuarioController;

const usuarioMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    usuarioController = new UsuarioController;
    next();
}

router.use(usuarioMiddleware);

router.get('/', usuarioController.list);
router.post('/', usuarioController.create);
router.get('/:id', usuarioController.read);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);
router.post('/signin', usuarioController.signin);

export default router;
