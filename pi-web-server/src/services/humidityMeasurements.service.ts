import { HumidityMeasurement } from '../types/types';
import { selectQuery } from './db.service';

const GET_MEASUREMENTS_QUERY = 'SELECT date, value FROM humidity_measurements LIMIT 100';

type DatabaseHumidityMeasurement = {
    date: number;
    value: string;
};

export async function getHumidityMeasurements(): Promise<HumidityMeasurement[]> {
    const { rows } = await selectQuery<DatabaseHumidityMeasurement>(GET_MEASUREMENTS_QUERY);
    return rows.map(({ date, value }) => ({ date, value: JSON.parse(value) }));
}
