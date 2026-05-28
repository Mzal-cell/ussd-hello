// states/welcome.js
// USSD state handler for 'welcome' screen
// input - what the user inputs
// context - the current context of the session, which can be used to store data across states
module.exports = function welcome(input, context) {
  if (input === "") {
    return {
      response: "CON Jetlink Boda\n1. Book a ride\n2. My rides\n3. Support",
      nextState: "welcome",
      nextContext: context,
    };
  }

  if (input === "1") {
    return {
      response:
        "CON Pick up from?\n1. Yaya\n2. Valley Arcade\n3. Sarit\n0. Back",
      nextState: "choose_pickup",
      nextContext: context,
    };
  }

  if (input === "2") {
    return {
      response: "END Your rides: (coming on Day 3)",
      nextState: "done",
      nextContext: context,
    };
  }

  if (input === "3") {
    return {
      response: "END Call +254712000000 for support.",
      nextState: "done",
      nextContext: context,
    };
  }

  return {
    response: "CON Invalid option.\n1. Book a ride\n2. My rides\n3. Support",
    nextState: "welcome",
    nextContext: context,
  };
};