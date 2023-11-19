import express from 'express';
import { ChatgptController } from './chatgptController';

const router = express.Router();

router.post('/talk', ChatgptController.talk);

export { router as ChatGPTRouter };
