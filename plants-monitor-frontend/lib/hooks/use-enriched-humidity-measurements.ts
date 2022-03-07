import { useHumidityMeasurements } from 'lib/api/humidity-measurements';
import { useHumiditySensors } from 'lib/api/humidity-sensors';

export const useEnrichedHumidityMeasurements = () => {
    const {
        measurements,
        isLoading: isMeasurementsLoading,
        isError: isMeasurementsError,
    } = useHumidityMeasurements();
    const { sensors, isLoading: isSensorsLoading, isError: isSensorsError } = useHumiditySensors();

    const isLoading = isMeasurementsLoading || isSensorsLoading;
    const isError = isMeasurementsError || isSensorsError;

    let sensorsWithData;
    if (!isLoading && !isError && sensors && measurements) {
        sensorsWithData = sensors.map((sensor, index) => {
            const sensorData = measurements
                .map((measurement) => ({
                    date: measurement.date,
                    value: measurement.value[index],
                }))
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
