import React from 'react';
import styles from './TrafficLight.module.css';

interface TrafficLightProps {
    state: string;
}

export const PedestrianTrafficLightDisplay: React.FC<TrafficLightProps> = ({ state }) => {
    return (
        <div className={styles['traffic-light-display']}>
            <div className={`${styles['traffic-light-go']} ${state === 'go' ? styles['on'] : styles['off']}`}></div>
            <div className={`${styles['traffic-light-stop']} ${state === 'stop' ? styles['on'] : styles['off']}`}></div>
        </div>
    );
}
