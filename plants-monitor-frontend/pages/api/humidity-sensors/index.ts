import { API_ROUTE_GET_HUMIDITY_SENSORS } from 'lib/constants/api-routes';
import { NextApiRequest, NextApiResponse } from 'next';

const ROUTE_GET_HUMIDITY_SENSORS =
    process.env.NEXT_PUBLIC_BACKEND_URL + API_ROUTE_GET_HUMIDITY_SENSORS;

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    fetch(ROUTE_GET_HUMIDITY_SENSORS)
        .then((res) => res.json())
        .then((res) => {
            response.status(200).json(res);
        })
        .catch((error) => {
            response.status(500).json({
                error,
            });
        });
}
