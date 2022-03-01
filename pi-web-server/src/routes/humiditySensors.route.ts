import express from 'express';
import {
    getHumiditySensorsController,
    updateHumiditySensorController,
} from '../controllers/humiditySensors.controller';

const router = express.Router();

router.get('/', getHumiditySensorsController);
router.put('/:sensorId', updateHumiditySensorController);

export default router;
