import express from 'express';
import { chatCompletion } from '../controllers/chatController.js';

const router = express.Router();

router.post('/completions', chatCompletion);

export default router;
