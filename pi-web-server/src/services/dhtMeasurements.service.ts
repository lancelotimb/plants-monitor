import { DhtMeasurement } from '../types/types';
import { selectQuery } from './db.service';

const GET_LAST_DHT_QUERY = 'SELECT * FROM dht_measurements ORDER BY date DESC LIMIT 1;';

type DatabaseDhtMeasurement = {
    date: number;
    temperature: number;
    humidity: number;
};

export async function getLastDhtMeasurement(): Promise<DhtMeasurement> {
    const { rows } = await selectQuery<DatabaseDhtMeasurement>(GET_LAST_DHT_QUERY);
    return rows[0];
}
