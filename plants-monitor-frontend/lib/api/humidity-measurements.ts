import useSWR from 'swr';
import { HumidityMeasurement } from 'lib/types/types';

const API_ROUTE_HUMIDITY_MEASUREMENTS =
    process.env.NEXT_PUBLIC_BACKEND_URL + '/humidity-measurements';

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
