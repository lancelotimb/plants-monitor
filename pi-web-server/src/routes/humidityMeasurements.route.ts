import express from 'express';
import { getHumidityMeasurementsController } from '../controllers/humidityMeasurements.controller';

const router = express.Router();

router.get('/', getHumidityMeasurementsController);

export default router;
