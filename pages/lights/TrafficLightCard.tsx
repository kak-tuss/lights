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

function getDisplay(trafficLightType: TrafficLightType, state: string): JSX.Element {
    if (trafficLightType === TrafficLightType.PEDESTRIAN) {
        return (
            <PedestrianTrafficLightDisplay state={state} />
        );
    } else {
        return (
            <VehicleTrafficLightDisplay state={state} />
        );    
    }
}

export const TrafficLightCardComponent: React.FC<TrafficLightCardProps> = ({ trafficLight }) => {
    console.log('traffic light card component render');    
    const trafficLightStateMachine = setUpMachine(trafficLight);


    const [trafficLightCurrentState, setTrafficLightCurrentState] = useState<string>(trafficLightStateMachine.getCurrentState());
    const [isItOnState, setIsItOnState] = useState<boolean>(isItOn(trafficLightStateMachine.getCurrentState()));

    console.log('state init happened, current state is ', trafficLightStateMachine.getCurrentState());
    console.log('is it on?', isItOn(trafficLightStateMachine.getCurrentState()), 'is it on the state', isItOnState);

    return (
        <div className={styles['traffic-light-card']}>
            current state: {trafficLightCurrentState}
            <div className={styles['traffic-light-data']}>
                <h2>{trafficLight.name}</h2>
                <h4>{trafficLight.address}            
                    <span>{trafficLight.direction}</span>
                </h4>
                <label htmlFor={`switch${trafficLight.id}`}>Power 
                    <input type="checkbox" id={`switch${trafficLight.id}`} 
                        checked={isItOnState} 
                        onChange={() => {
                            if (!isItOnState) {
                                trafficLightStateMachine.transition('powerOn');
                            } else {
                                trafficLightStateMachine.transition('powerOff');
                            }
                            setTrafficLightCurrentState(trafficLightStateMachine.getCurrentState());
                            setIsItOnState(isItOn(trafficLightStateMachine.getCurrentState()));
                        }} />
                </label>
                <button onClick={() => {
                    console.log('cycle light states');
                    trafficLightStateMachine.transition('cycle');
                    console.log('current state', trafficLightStateMachine.getCurrentState());

                    setTrafficLightCurrentState(trafficLightStateMachine.getCurrentState());
                    setIsItOnState(isItOn(trafficLightStateMachine.getCurrentState()));
                }}>Cycle</button>
            </div>
            {getDisplay(trafficLight.type, trafficLightCurrentState)}
        </div>
    );
};

export default TrafficLightCardComponent;