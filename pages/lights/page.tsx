import React, { useEffect, useState } from 'react';
import { TrafficLightComponent } from './trafficLight'; 


export const TrafficLightsPage: React.FC = () => {
    const [trafficLights, setTrafficLights] = useState([]);

    useEffect(() => {
        // Fetch traffic lights data from API
        const fetchTrafficLights = async () => {
            try {
                const response = await fetch('your-api-endpoint');
                const data = await response.json();
                setTrafficLights(data);
            } catch (error) {
                console.error('Error fetching traffic lights:', error);
            }
        };

        fetchTrafficLights();
    }, []);

    return (
        <div>
            <h1>Tracked Traffic Lights</h1>
            {trafficLights.map((trafficLight) => (
                <TrafficLightComponent key={trafficLight.id} trafficLight={trafficLight} />
            ))}
        </div>
    );
};

export default TrafficLightsPage;