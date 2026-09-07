import express from 'express';
import { assistirAi, analisarEmail } from '../controllers/aiController.js';

const router = express.Router();

router.post('/assist', assistirAi);

router.post('/analisar-email', analisarEmail);

export default router;