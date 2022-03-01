import { DatabaseRows, HumiditySensor } from '../types/types';
import { executeQuery } from './db.service';

const GET_HUMIDITY_SENSORS = 'SELECT * FROM humidity_sensors;';

type DatabaseHumiditySensors = DatabaseRows<{
    id: number;
    label: string;
    max: number;
    min: number;
}>;

export async function getHumiditySensors(): Promise<Array<HumiditySensor>> {
    const { rows } = (await executeQuery(GET_HUMIDITY_SENSORS)) as DatabaseHumiditySensors;
    return rows.map((sensor) => ({
        id: sensor.id,
        label: sensor.label,
        maxValue: sensor.max,
        minValue: sensor.min,
    }));
}
