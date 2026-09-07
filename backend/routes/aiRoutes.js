import express from 'express';
import { assistirAi } from '../controllers/aiController.js';

const router = express.Router();

router.post('/assist', assistirAi);

export default router;