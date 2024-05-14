import { StateMachineDefinition } from "fsm-ts";

export const pedestrianMachineSetup: StateMachineDefinition = {
    initialState: 'off',
    states: [{
        name: 'off',
        transitions: [{
            target: 'stop',
            event: 'powerOn'
        }]
    },{
        name: 'stop',
        transitions: [{
            target: 'go',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }],
        onEnter: function(context) {
            console.log('Entering stop state');
        }
    },{
        name: 'go',
        transitions: [{
            target: 'stop',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }],
        onEnter: function(context) {
            console.log('Entering go state');
        }
    }]

}

export const vehicleMachineSetup: StateMachineDefinition = {
    initialState: 'off',
    states: [{ 
        name: 'off',
        transitions: [{
            target: 'stop',
            event: 'powerOn'
        }]
    },{
        name: 'dead',
        transitions: [{
            target: 'stop',
            event: 'vehicleCrossing'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'go',
        transitions: [{
            target: 'stop',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'stop',
        transitions: [{
            target: 'waitforgo',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'waitforgo',
        transitions: [{
            target: 'go',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'waitforstop',
        transitions: [{
            target: 'stop',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    }]

}

export const pedestrianAutoMachineSetup: StateMachineDefinition = {
    initialState: 'off',
    states: [{
        name: 'off',
        transitions: [{
            target: 'stop',
            event: 'powerOn'
        }]
    },{
        name: 'stop',
        transitions: [{
            target: 'go',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }],
        onEnter: function(context) {
            console.log('Entering stop state');
            this.timer = setTimeout(function() {
                context.transition('cycle');
            }, 5000);
        },
        onExit: function() {
            clearTimeout(this.timer);
        }
    },{
        name: 'go',
        transitions: [{
            target: 'stop',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }],
        onEnter: function(context) {
            console.log('Entering go state');
            this.timer = setTimeout(function() {
                context.transition('cycle');
            }, 5000);
        },
        onExit: function() {
            clearTimeout(this.timer);
        }  
    }]
};

export const vehicleAutoMachineSetup: StateMachineDefinition = {
    initialState: 'off',
    states: [{ 
        name: 'off',
        transitions: [{
            target: 'stop',
            event: 'powerOn'
        }]
    },{
        name: 'dead',
        transitions: [{
            target: 'stop',
            event: 'vehicleCrossing'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'go',
        transitions: [{
            target: 'stop',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'stop',
        transitions: [{
            target: 'waitforgo',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'waitforgo',
        transitions: [{
            target: 'go',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    },{
        name: 'waitforstop',
        transitions: [{
            target: 'stop',
            event: 'cycle'
        },{
            target: 'off',
            event: 'powerOff'
        }]
    }]
};

