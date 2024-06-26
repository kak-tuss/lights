import { NextApiRequest, NextApiResponse } from 'next';
import { lightsData as lightsDataMock } from '../../mocks/lights';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const lightsData = lightsDataMock;
        // Return all available lights
        res.status(200).json(lightsData);
    } catch (error) {
        // Handle file read error
        res.status(500).json({ message: 'Internal Server Error' });
    }
}