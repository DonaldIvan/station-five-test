import { Router } from 'express';
import { postMessage } from '../contoller/message';

const router = Router();
router.post('/', postMessage);

export default router;
