export type HumidityMeasurement = {
    // Timestamp of the measurement (milliseconds)
    date: number;
    // Array of measurements (1 per sensor, in order)
    value: number[];
};
