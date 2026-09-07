import express from "express";
import { buscarEmailsGmail } from "../controllers/gmailController.js";

const router = express.Router();

router.get("/gmail/emails", buscarEmailsGmail);

export default router;