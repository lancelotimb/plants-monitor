export type HumidityMeasurement = {
    // Timestamp of the measurement (milliseconds)
    date: number;
    // Array of measurements (1 per sensor, in order)
    value: number[];
};

export type DhtMeasurement = {
    // Timestamp of the measurement (milliseconds)
    date: number;
    // Temperature in celsius
    temperature: number;
    // Humidity in %
    humidity: number;
};

export type HumiditySensor = {
    /* ID of the sensor */
    id: number;
    /* Label of the sensor */
    label: string;
    /* Max possible absolute value */
    maxValue: number;
    /* Min possible absolute value */
    minValue: number;
};
