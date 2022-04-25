import express from 'express';
import { waterAllCommandController } from '../controllers/specialCommandsQueue.controller';

const router = express.Router();

router.post('/water-all', waterAllCommandController);

export default router;
