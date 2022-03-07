import { RequestHandler } from 'express-serve-static-core';
import { addCommand } from '../services/commandsQueue.service';

export const addCommandController: RequestHandler = async (req, res, next) => {
    const { command } = req.body;

    try {
        res.json(await addCommand(command));
    } catch (err) {
        console.error('Error while adding command', err);
        next(err);
    }
};
