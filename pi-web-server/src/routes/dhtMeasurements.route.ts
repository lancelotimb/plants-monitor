import express from 'express';
import { getLastDhtMeasurementController } from '../controllers/dhtMeasurements.controller';

const router = express.Router();

router.get('/last', getLastDhtMeasurementController);

export default router;
