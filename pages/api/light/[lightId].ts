import { NextApiRequest, NextApiResponse } from 'next';
import { lightsData as lightsDataMock } from '../../../mocks/lights';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const lightId = req.query.lightId;
        const lightsData = lightsDataMock;
        const selectedLightData = lightsData
                .filter(light => light.id === lightId);
        res.status(200).json(selectedLightData);
    } catch (error) {
        // Handle file read error
        res.status(500).json({ message: 'Internal Server Error' });
    }
}