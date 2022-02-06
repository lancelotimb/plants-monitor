import useSWR from 'swr';
import { DhtMeasurement } from 'lib/types/types';

const API_ROUTE_LAST_DHT = process.env.NEXT_PUBLIC_BACKEND_URL + '/dht-measurements/last';

export type FetchLastDhtResponseType = DhtMeasurement;

export const fetchLastDhtMeasurement = () => fetch(API_ROUTE_LAST_DHT).then((res) => res.json());

export const useLastDhtMeasurement = () => {
    const { data, error } = useSWR<FetchLastDhtResponseType>('get-last-dht', () =>
        fetchLastDhtMeasurement()
    );

    return {
        dhtMeasurement: data,
        isLoading: !error && !data,
        isError: error,
    };
};
