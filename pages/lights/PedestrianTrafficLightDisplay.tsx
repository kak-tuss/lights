import React from 'react';
import styles from './TrafficLight.module.css';

interface TrafficLightProps {
    trafficLightCurrentState: string;
}

export const PedestrianTrafficLightDisplay: React.FC<TrafficLightProps> = ({ trafficLightCurrentState }) => {
    return (
        <div className={styles['traffic-light-display']}>
            <div className={`${styles['traffic-light-stop']} 
                ${trafficLightCurrentState === 'stop' ? styles['on'] : styles['off']}`}></div>
            <div className={`${styles['traffic-light-go']} 
                ${trafficLightCurrentState === 'go' ? styles['on'] : styles['off']}`}></div>
        </div>
    );
}
