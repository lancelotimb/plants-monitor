import { API_ROUTE_LAST_DHT_MEASUREMENT } from 'lib/constants/api-routes';
import useSWR from 'swr';
import { DhtMeasurement } from 'lib/types/types';

export type FetchLastDhtResponseType = DhtMeasurement;

export const fetchLastDhtMeasurement = () =>
    fetch(API_ROUTE_LAST_DHT_MEASUREMENT).then((res) => res.json());

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
