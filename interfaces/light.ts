export enum powerType {
    BATTERY = 'BATTERY',
    SOLAR = 'SOLAR',
}

export enum TrafficLightType {
    VEHICLE = 'VEHICLE',
    PEDESTRIAN = 'PEDESTRIAN',
}

export interface TrafficLight {
    id: string;
    name: string;
    address: string;
    direction: string;
    power: powerType;
    type: TrafficLightType;
}