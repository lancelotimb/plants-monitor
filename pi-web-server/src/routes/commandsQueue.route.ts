import express from 'express';
import { addCommandController } from '../controllers/commandsQueue.controller';

const router = express.Router();

router.post('/add', addCommandController);

export default router;
