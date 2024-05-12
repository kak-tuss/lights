import React from 'react';
import { TrafficLight } from '../../types/trafficlight';

interface TrafficLightProps {
    trafficLight: TrafficLight;
}

export const TrafficLightComponent: React.FC<TrafficLightProps> = ({ trafficLight }) => {
    return (
        <div>
            traffic light
        </div>
    );
};

export default TrafficLightComponent;