export enum PowerType {
    BATTERY, 
    SOLAR
}

export enum TrafficLightType {
    VEHICLE,
    PEDESTRIAN
}

export interface TrafficLight {
    id: string;
    name: string;
    address: string;
    direction: string;
    power: PowerType;
    type: TrafficLightType;
}