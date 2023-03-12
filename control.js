"use strict";

const Gpio = require("onoff").Gpio;
const prompt = require("prompt");
const LED_RED = new Gpio(22, "out");
const LED_YELLOW = new Gpio(27, "out");
const LED_GREEN = new Gpio(17, "out");

/**
 * Function that uses the prompt module to ask the color of the light to switch on. 
 * Once it receive the input, it evaluates that using a switch case 
 * and enlight the appropriate LED.
 * 
 * So if the user enters red, it will switch on the red LED. 
 * However entering exit will exit the program 
 * and for any other input than the three colors and exit, 
 * it will show an error message.
 */
function ask() {
  prompt.start();
  prompt.get(["color"], function (err, result) {
    if (err) {
      close();
    } else {
      const color = result.color.toLowerCase();
      handle(color);
    }
  });
}

function handle(color) {
  // make all the lights off
  switchOffAll();

  switch (color) {
    case "red":
      LED_RED.writeSync(1);
      break;
    case "yellow":
      LED_YELLOW.writeSync(1);
      break;
    case "green":
      LED_GREEN.writeSync(1);
      break;
    case "exit":
      exit();
      break;
    default:
      console.log(`We don\'t have ${color} color LED`);
  }
  ask();
}

function switchOffAll() {
  // make all the lights off
  LED_RED.writeSync(0);
  LED_YELLOW.writeSync(0);
  LED_GREEN.writeSync(0);
}

function exit() {
  switchOffAll();
  LED_RED.unexport();
  LED_YELLOW.unexport();
  LED_GREEN.unexport();
  process.exit(0);
}
console.log("let the fun begin!");
ask();
