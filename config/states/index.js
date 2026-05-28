// states/index.js
const welcome = require("./welcome");
const choosePickup = require("./choosePickup");
const chooseDropoff = require("./chooseDropoff");
const confirmBooking = require("./confirmBooking");

module.exports = {
  welcome,
  choose_pickup: choosePickup,
  choose_dropoff: chooseDropoff,
  confirm_booking: confirmBooking,
};