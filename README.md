This is an application that uses fsm-ts library for a traffic lights example.

Stuff I would have done if I had known react better and had infinite time:

1. I would implement code that could use the state machine as main state to update the react component tree.
2. I would then be able to implement autonomous state changes for the traffic lights - meaning they would change according to timers (there is a def for this in defs.ts, unfortunately I was unable to catch the machine state changes in my app to trigger change propagation). I have an idea to do it with events fired by FSM.
3. Generally FSM itself could have more features, like firing events on state change etc.
4. This app could also implement state machine for battery powered traffic lights that could hold the charge and use / charge.

To get this app to run you need to download and install two repos

```
git clone https://github.com/kak-tuss/lights.git
git clone https://github.com/kak-tuss/fsm-ts.git
```

while in fsm-ts folder run 
```
npm run build
npm link
```

while in lights folder run
```
npm link fsm-ts
npm install
```

To run the project open lights folder and run
```
npm run dev
```

Unit tests are available in fsm-ts project, to run them
```
npm run test
``` 