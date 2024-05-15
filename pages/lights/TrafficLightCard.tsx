import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StateMachine } from 'fsm-ts';
import { TrafficLight, TrafficLightType } from '../../types/trafficlight';
import { pedestrianMachineSetup, vehicleMachineSetup } from './defs';
import { PedestrianTrafficLightDisplay } from './PedestrianTrafficLightDisplay';
import { VehicleTrafficLightDisplay } from './VehicleTrafficLightDisplay';
import styles from './TrafficLight.module.css';

interface TrafficLightCardProps {
    trafficLight: TrafficLight;
}

function isItOn(state: string): boolean {
    return state !== 'off' && state !== 'dead';
}

function setUpMachine(trafficLight: TrafficLight): StateMachine {
    let trafficLightState: StateMachine = undefined;
    if (trafficLight.type === TrafficLightType.PEDESTRIAN) {
        trafficLightState = new StateMachine(pedestrianMachineSetup);
    } else {
        trafficLightState = new StateMachine(vehicleMachineSetup);
    }
    return trafficLightState;
}

function getDisplay(trafficLightType: TrafficLightType, trafficLightCurrentState: string): JSX.Element {
    if (trafficLightType === TrafficLightType.PEDESTRIAN) {
        return (
            <PedestrianTrafficLightDisplay trafficLightCurrentState={trafficLightCurrentState} />
        );
    } else {
        return (
            <VehicleTrafficLightDisplay trafficLightCurrentState={trafficLightCurrentState} />
        );    
    }
}

export const TrafficLightCardComponent: React.FC<TrafficLightCardProps> = ({ trafficLight }) => {
    // const [trafficLightStateMachine, setTrafficLightStateMachine] = useState<StateMachine>(setUpMachine(trafficLight));
    const trafficLightStateMachineRef = React.useRef<StateMachine>(setUpMachine(trafficLight));
    const [trafficLightState, setTrafficLightState] = useState<string>(trafficLightStateMachineRef.current.getCurrentState());

    useEffect(() => {
        setTrafficLightState(trafficLightStateMachineRef.current.getCurrentState());
    }, [trafficLightStateMachineRef.current]);

    return (
        <div className={styles['traffic-light-card']}>
            <div className={styles['traffic-light-data']}>
                <h2>{trafficLight.name}</h2>
                <h4>{trafficLight.address}            
                    <span>{trafficLight.direction}</span>
                </h4>
                <label htmlFor={`switch${trafficLight.id}`}>Turn {isItOn(trafficLightState) ? 'Off' : 'On'} 
                    <input type="checkbox" id={`switch${trafficLight.id}`} 
                        checked={isItOn(trafficLightState)} 
                        onChange={() => {
                            let currentMachineState = trafficLightStateMachineRef.current;
                            if (!isItOn(trafficLightState)) {
                                //trafficLightStateMachine.transition('powerOn');
                                currentMachineState.transition('powerOn');
                            } else {
                                //trafficLightStateMachine.transition('powerOff');
                                currentMachineState.transition('powerOff');
                            }
                            setTrafficLightState(trafficLightStateMachineRef.current.getCurrentState());
                        }} />
                </label>
                <button
                    onClick={() => {
                        trafficLightStateMachineRef.current.transition('cycle');
                        setTrafficLightState(trafficLightStateMachineRef.current.getCurrentState());
                    }}
                    disabled={!isItOn(trafficLightState)}
                >
                    Cycle
                </button>
            </div>
            {getDisplay(trafficLight.type, trafficLightState)}
        </div>
    );
};

export default TrafficLightCardComponent;