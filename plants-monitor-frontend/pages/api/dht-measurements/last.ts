import { API_ROUTE_LAST_DHT_MEASUREMENT } from 'lib/constants/api-routes';
import { NextApiRequest, NextApiResponse } from 'next';

const ROUTE_LAST_DHT_MEASUREMENT =
    process.env.NEXT_PUBLIC_BACKEND_URL + API_ROUTE_LAST_DHT_MEASUREMENT;

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    fetch(ROUTE_LAST_DHT_MEASUREMENT)
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
