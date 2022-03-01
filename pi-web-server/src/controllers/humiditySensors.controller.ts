import { RequestHandler } from 'express-serve-static-core';
import { getHumiditySensors, updateHumiditySensor } from '../services/humiditySensors.service';

export const getHumiditySensorsController: RequestHandler = async (req, res, next) => {
    try {
        res.json(await getHumiditySensors());
    } catch (err) {
        console.error('Error while getting humidity sensors', err);
        next(err);
    }
};

export const updateHumiditySensorController: RequestHandler = async (req, res, next) => {
    const id = Number(req.params.sensorId);
    const updatedSensor = {
        id,
        label: req.body.label,
        maxValue: req.body.maxValue,
        minValue: req.body.minValue,
    };

    try {
        res.json(await updateHumiditySensor(updatedSensor));
    } catch (err) {
        console.error('Error while updating humidity sensor', err);
        next(err);
    }
};
