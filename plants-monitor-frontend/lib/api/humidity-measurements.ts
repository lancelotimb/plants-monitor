import useSWR from 'swr';
import { HumidityMeasurement } from 'lib/types/types';
import { API_ROUTE_HUMIDITY_MEASUREMENTS } from 'lib/constants/api-routes';

export type FetchHumidityMeasurementsResponseType = Array<HumidityMeasurement>;

export const fetchHumidityMeasurements = () =>
    fetch(API_ROUTE_HUMIDITY_MEASUREMENTS).then((res) => res.json());

export const useHumidityMeasurements = () => {
    const { data, error } = useSWR<FetchHumidityMeasurementsResponseType>(
        'get-humidity-measurements',
        () => fetchHumidityMeasurements()
    );

    return {
        measurements: data,
        isLoading: !error && !data,
        isError: error,
    };
};
