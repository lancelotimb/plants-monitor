import { HumiditySensor } from '../types/types';
import { runQuery, selectQuery } from './db.service';

const GET_HUMIDITY_SENSORS = 'SELECT * FROM humidity_sensors;';
const UPDATE_HUMIDITY_SENSOR =
    'UPDATE humidity_sensors SET label = "$label", max = $max, min = $min WHERE id = $id';

type DatabaseHumiditySensor = {
    id: number;
    label: string;
    max: number;
    min: number;
};

export async function getHumiditySensors(): Promise<Array<HumiditySensor>> {
    const { rows } = await selectQuery<DatabaseHumiditySensor>(GET_HUMIDITY_SENSORS);
    return rows.map((sensor) => ({
        id: sensor.id,
        label: sensor.label,
        maxValue: sensor.max,
        minValue: sensor.min,
    }));
}

export async function updateHumiditySensor(sensor: HumiditySensor): Promise<boolean> {
    const query = UPDATE_HUMIDITY_SENSOR.replace('$label', sensor.label)
        .replace('$max', sensor.maxValue.toString())
        .replace('$min', sensor.minValue.toString())
        .replace('$id', sensor.id.toString());

    return runQuery(query);
}
