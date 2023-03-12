"use strict";

const Gpio = require('onoff').Gpio;
const LED = new Gpio(4, 'out'); // gpio 4 as out

const timer = setInterval(()=>{
  if (LED.readSync() === 0) { // if current pin state is 0 (off)
    LED.writeSync(1); // make it 1 (on)
  } else {
    LED.writeSync(0); // make it 0 (off)
  }
}, 250);


function switchOff(){
  clearInterval(timer);
  LED.writeSync(0); // making the gpio 4 off. Will turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}

setTimeout(switchOff, 10000);