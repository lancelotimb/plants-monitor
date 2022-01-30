import useSWR from 'swr';

const API_ROUTE_HUMIDITY_MEASUREMENTS = 'http://localhost:3001/humidity-measurements';

export const fetchHumidityMeasurements = () =>
    fetch(API_ROUTE_HUMIDITY_MEASUREMENTS).then((res) => res.json());

export const useHumidityMeasurements = () => {
    const { data, error } = useSWR('get-humidity-measurements', () => fetchHumidityMeasurements());

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};
