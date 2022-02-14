import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    fetch('http://laniche.freeboxos.fr:3001/humidity-measurements')
        .then((res) => res.json())
        .then((res) => {
            response.status(200).json({
                res,
            });
        })
        .catch((error) => {
            response.status(500).json({
                error,
            });
        });
}
