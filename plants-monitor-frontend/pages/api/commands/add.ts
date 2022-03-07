import { API_ROUTE_ADD_COMMAND } from 'lib/constants/api-routes';
import { NextApiRequest, NextApiResponse } from 'next';

const ROUTE_ADD_COMMAND = process.env.NEXT_PUBLIC_BACKEND_URL + API_ROUTE_ADD_COMMAND;

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    const { body } = request;
    const command = body.command;
    if (command) {
        fetch(ROUTE_ADD_COMMAND, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command }),
        })
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
}
