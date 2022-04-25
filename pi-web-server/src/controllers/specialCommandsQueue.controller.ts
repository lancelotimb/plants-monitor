import { RequestHandler } from 'express-serve-static-core';
import { addCommand } from '../services/commandsQueue.service';

export const waterAllCommandController: RequestHandler = async (req, res, next) => {
    const command = 'ACTIVATE_PUMP_D_6000';

    try {
        res.json(await addCommand(command));
    } catch (err) {
        console.error('Error while adding command', err);
        next(err);
    }
};
