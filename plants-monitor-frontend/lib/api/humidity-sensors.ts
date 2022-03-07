import useSWR from 'swr';
import { HumiditySensor } from 'lib/types/types';
import { API_ROUTE_GET_HUMIDITY_SENSORS } from 'lib/constants/api-routes';

export type FetchHumiditySensorsResponseType = Array<HumiditySensor>;

export const fetchHumiditySensors = () =>
    fetch(API_ROUTE_GET_HUMIDITY_SENSORS).then((res) => res.json());

export const useHumiditySensors = () => {
    const { data, error } = useSWR<FetchHumiditySensorsResponseType>('get-humidity-sensors', () =>
        fetchHumiditySensors()
    );

    return {
        sensors: data,
        isLoading: !error && !data,
        isError: error,
    };
};
