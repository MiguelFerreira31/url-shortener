import { Router } from 'express';
import { createUrl, getAllUrls, redirectUrl } from '../controllers/urlController';

const router = Router();

router.post('/', createUrl);          // Criar URL encurtada
router.get('/', getAllUrls);          // Listar todas URLs
router.get('/:slug', redirectUrl);    // Redirecionar e incrementar clicks

export default router;
