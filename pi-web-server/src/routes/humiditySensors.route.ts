import express from 'express';
import { getHumiditySensorsController } from '../controllers/humiditySensors.controller';

const router = express.Router();

router.get('/', getHumiditySensorsController);

export default router;
