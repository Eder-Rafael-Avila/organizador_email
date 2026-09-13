import express from 'express';
import { criarLembrete } from '../controllers/lembreteController.js';

const router = express.Router();

router.post('/lembretes', criarLembrete);

export default router;