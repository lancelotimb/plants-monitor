import { DatabaseRows, DhtMeasurement } from '../types/types';
import { executeQuery } from './db.service';

const GET_LAST_DHT_QUERY = 'SELECT * FROM dht_measurements ORDER BY date DESC LIMIT 1;';

type DatabaseDhtMeasurements = DatabaseRows<{
    date: number;
    temperature: number;
    humidity: number;
}>;

export async function getLastDhtMeasurement(): Promise<DhtMeasurement> {
    const { rows } = (await executeQuery(GET_LAST_DHT_QUERY)) as DatabaseDhtMeasurements;
    return rows[0];
}
