import { useHumidityMeasurements } from 'lib/api/humidity-measurements';
import { useHumiditySensors } from 'lib/api/humidity-sensors';

const normalizeMeasurement = (measure: number, maxValue: number, minValue: number) => {
    const normalized = (measure - minValue) / (maxValue - minValue);
    return Math.round((1 - normalized) * 1000) / 1000;
};

export const useEnrichedHumidityMeasurements = (interval?: number) => {
    const {
        measurements,
        isLoading: isMeasurementsLoading,
        isError: isMeasurementsError,
    } = useHumidityMeasurements(interval);
    const { sensors, isLoading: isSensorsLoading, isError: isSensorsError } = useHumiditySensors();

    const isLoading = isMeasurementsLoading || isSensorsLoading;
    const isError = isMeasurementsError || isSensorsError;

    let sensorsWithData;
    if (!isLoading && !isError && sensors && measurements) {
        sensorsWithData = sensors.map((sensor, index) => {
            const sensorData = measurements
                .map((measurement) => {
                    const measure = measurement.value[index];
                    return {
                        date: measurement.date,
                        value: measure
                            ? normalizeMeasurement(measure, sensor.maxValue, sensor.minValue)
                            : undefined,
                    };
                })
                .filter(({ value }) => Boolean(value));

            return {
                ...sensor,
                measurements: sensorData,
                lastMeasurement: sensorData.at(-1),
            };
        });
    }

    return {
        isLoading,
        isError,
        sensors,
        measurements,
        sensorsWithData,
    };
};
