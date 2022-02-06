import { RequestHandler } from 'express-serve-static-core';
import { getLastDhtMeasurement } from '../services/dhtMeasurements.service';

export const getLastDhtMeasurementController: RequestHandler = async (req, res, next) => {
    try {
        res.json(await getLastDhtMeasurement());
    } catch (err) {
        console.error('Error while getting dht measurements', err);
        next(err);
    }
};
