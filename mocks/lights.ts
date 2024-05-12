import { TrafficLight, PowerType, TrafficLightType } from "../types/trafficlight";

export const lightsData: TrafficLight[] = [{
    "id": "1",
    "name": "Rina",
    "address": "Kugel corner Sokolov, Holon",
    "direction": "North",
    "power": PowerType.SOLAR,
    "type": TrafficLightType.VEHICLE
},{
    "id": "2",
    "name": "Rina",
    "address": "Kugel corner Sokolov, Holon",
    "direction": "South",
    "power": PowerType.BATTERY,
    "type": TrafficLightType.VEHICLE
},{
    "id": "3",
    "name": "Rina",
    "address": "Kugel corner Sokolov, Holon",
    "direction": "North",
    "power": PowerType.SOLAR,
    "type": TrafficLightType.PEDESTRIAN
},{
    "id": "4",
    "name": "Rina",
    "address": "Kugel corner Sokolov, Holon",
    "direction": "SOUTH",
    "power": PowerType.BATTERY,
    "type": TrafficLightType.PEDESTRIAN
},{
    "id": "5",
    "name": "Azrieli",
    "address": "Kaplan corner Menachem Begin, Tel Aviv",
    "direction": "West",
    "power": PowerType.SOLAR,
    "type": TrafficLightType.VEHICLE
}]