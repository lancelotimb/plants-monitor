import { API_ROUTE_HUMIDITY_MEASUREMENTS } from 'lib/constants/api-routes';
import { NextApiRequest, NextApiResponse } from 'next';

const ROUTE_HUMIDITY_MEASUREMENTS =
    process.env.NEXT_PUBLIC_BACKEND_URL + API_ROUTE_HUMIDITY_MEASUREMENTS;

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    fetch(ROUTE_HUMIDITY_MEASUREMENTS)
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
