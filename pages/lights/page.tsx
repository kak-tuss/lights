import React, { useEffect, useState } from 'react';
import styles from './TrafficLight.module.css';
import { TrafficLightCardComponent } from './TrafficLightCard'; 

export const TrafficLightsPage: React.FC = () => {
    const [trafficLights, setTrafficLights] = useState([]);
    

    
    useEffect(() => {
        // Fetch traffic lights data from API
        const fetchTrafficLights = async () => {
            try {
                const response = await fetch('api/lights');
                const data = await response.json();
                setTrafficLights(data);
            } catch (error) {
                console.error('Error fetching traffic lights:', error);
            }
        };

        fetchTrafficLights();
    }, [
    ]);

    return (
        <div>
            <h1>Tracked Traffic Lights</h1>
            <div className={styles['status-box']}>
                {trafficLights.map((trafficLight) => (
                    <TrafficLightCardComponent key={trafficLight.id} trafficLight={trafficLight} />
                ))}
            </div>
        </div>
    );
};

export default TrafficLightsPage;