import { executeQuery } from './db.service';

export async function getHumidityMeasurements() {
    const { rows } = await executeQuery(
        `SELECT date, value FROM humidity_measurements`
    );

    return rows;
}
