import { DatabaseRows, HumidityMeasurement } from '../types/types';
import { executeQuery } from './db.service';

const GET_MEASUREMENTS_QUERY = 'SELECT date, value FROM humidity_measurements';

type DatabaseHumidityMeasurement = DatabaseRows<{
    date: number;
    value: string;
}>;

export async function getHumidityMeasurements(): Promise<HumidityMeasurement[]> {
    const { rows } = (await executeQuery(GET_MEASUREMENTS_QUERY)) as DatabaseHumidityMeasurement;
    return rows.map(({ date, value }) => ({ date, value: JSON.parse(value) }));
}
