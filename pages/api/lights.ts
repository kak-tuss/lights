import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Read the lights data from the JSON file
            const lightsData = fs.readFileSync('../../data/lights.json', 'utf8');
            const lights = JSON.parse(lightsData);
            // Check if an id was passed in the query parameters
            const { id } = req.query;
            if (id) {
                // Find the light with the matching id
                const light = lights.find((light) => light.id === id);
                if (light) {
                    // Return the specific light
                    res.status(200).json(light);
                } else {
                    // Handle light not found error
                    res.status(404).json({ message: 'Light not found' });
                }
            } else {
                // Return all available lights
                res.status(200).json(lights);
            }
        } catch (error) {
            // Handle file read error
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
