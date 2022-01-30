import { RequestHandler } from 'express-serve-static-core';
import { getHumidityMeasurements } from '../services/humidityMeasurements.service';

export const getHumidityMeasurementsController: RequestHandler = async (req, res, next) => {
    try {
        res.json(await getHumidityMeasurements());
    } catch (err) {
        console.error('Error while getting humidity measurements', err);
        next(err);
    }
};
