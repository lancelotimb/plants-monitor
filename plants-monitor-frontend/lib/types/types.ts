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
