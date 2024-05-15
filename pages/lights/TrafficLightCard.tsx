import React from 'react';
import { useState, useEffect } from 'react';
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
    console.log('is it on func', state);
    return state !== 'off' && state !== 'dead';
}

function setUpMachine(trafficLight: TrafficLight): StateMachine {
    const trafficLightWithState = { ...trafficLight};
    let trafficLightState: StateMachine = undefined;
    if (trafficLight.type === TrafficLightType.PEDESTRIAN) {
        trafficLightState = new StateMachine(pedestrianMachineSetup);
    } else {
        trafficLightState = new StateMachine(vehicleMachineSetup);
    }
    return trafficLightState;
}

function getDisplay(trafficLightType: TrafficLightType, trafficLightCurrentState: string): JSX.Element {
    console.log('get display', trafficLightType, trafficLightCurrentState);
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
    const [trafficLightStateMachine, setTrafficLightStateMachine] = useState<StateMachine>(setUpMachine(trafficLight));
    const [trafficLightState, setTrafficLightState] = useState<string>(trafficLightStateMachine.getCurrentState());
    const [isItOnState, setIsItOnState] = useState<boolean>(isItOn(trafficLightStateMachine.getCurrentState()));

    useEffect(() => {
        setTrafficLightState(trafficLightStateMachine.getCurrentState());
    }, [trafficLightStateMachine, trafficLightState, isItOnState]);

    return (
        <div className={styles['traffic-light-card']}>
            <div className={styles['traffic-light-data']}>
                <h2>{trafficLight.name}</h2>
                <h4>{trafficLight.address}            
                    <span>{trafficLight.direction}</span>
                </h4>
                <label htmlFor={`switch${trafficLight.id}`}>Power 
                    <input type="checkbox" id={`switch${trafficLight.id}`} 
                        checked={isItOnState} 
                        onChange={() => {
                            let currentMachineState = trafficLightStateMachine;
                            if (!isItOnState) {
                                //trafficLightStateMachine.transition('powerOn');
                                currentMachineState.transition('powerOn');
                            } else {
                                //trafficLightStateMachine.transition('powerOff');
                                currentMachineState.transition('powerOff');
                            }
                            setTrafficLightStateMachine(currentMachineState);
                            setTrafficLightState(trafficLightStateMachine.getCurrentState());
                            setIsItOnState(isItOn(trafficLightStateMachine.getCurrentState()));
                        }} />
                </label>
                <button
                    onClick={() => {
                        let currentMachineState = trafficLightStateMachine;
                        currentMachineState.transition('cycle');
                        setTrafficLightStateMachine(currentMachineState);
                        setTrafficLightState(trafficLightStateMachine.getCurrentState());
                        setIsItOnState(isItOn(trafficLightStateMachine.getCurrentState()));
                    }}
                    disabled={!isItOnState}
                >
                    Cycle
                </button>
            </div>
            {getDisplay(trafficLight.type, trafficLightState)}
        </div>
    );
};

export default TrafficLightCardComponent;