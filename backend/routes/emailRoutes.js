import express from 'express';
import { buscarEmails } from '../controllers/emailController.js';

const router = express.Router();

router.get('/emails', buscarEmails);

export default router;