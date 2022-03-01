import { RequestHandler } from 'express-serve-static-core';
import { getHumiditySensors } from '../services/humiditySensors.service';

export const getHumiditySensorsController: RequestHandler = async (req, res, next) => {
    try {
        res.json(await getHumiditySensors());
    } catch (err) {
        console.error('Error while getting humidity sensors', err);
        next(err);
    }
};
