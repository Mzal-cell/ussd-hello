// states.js

/**
 * USSD State Handlers for Jetlink Bodsa
 * 
 * Rules for responses:
 * - Start with "CON " if you expect the user to reply with more input.
 * - Start with "END " if you are showing a final message and closing the session.
 */

const welcome = (input, context) => {
  return {
    response: "CON Welcome to Jetlink Boda\n1. Book a Delivery\n2. Check Ride/Delivery Status\n3. Register as a Rider\n4. Contact Support",
    nextState: "mainMenuSelection",
    nextContext: { ...context } // Keep any existing session data safe
  };
};

const mainMenuSelection = (input, context) => {
  if (input === "1") {
    return {
      response: "CON Select Delivery Type\n1. Motorbike (Express)\n2. Pickup Truck\n0. Back",
      nextState: "deliveryMenu",
      nextContext: { ...context, action: "book_delivery" } // Track their action
    };
  } else if (input === "2") {
    return {
      response: "CON Enter your 6-digit Tracking ID or Order Number:",
      nextState: "trackOrder",
      nextContext: { ...context, action: "track_order" }
    };
  } else if (input === "3") {
    return {
      response: "END Thank you for your interest! Please visit our office or download the Jetlink Boda Driver App to complete registration.",
      nextState: "welcome",
      nextContext: {}
    };
  } else if (input === "4") {
    return {
      response: "END Call our 24/7 customer helpline directly on 0700000000. Thank you for choosing Jetlink Boda!",
      nextState: "welcome",
      nextContext: {}
    };
  } else {
    // Elegant fallback if the user types an invalid option
    return {
      response: "CON Invalid option.\nWelcome to Jetlink Boda\n1. Book a Delivery\n2. Check Ride/Delivery Status\n3. Register as a Rider\n4. Contact Support",
      nextState: "mainMenuSelection",
      nextContext: { ...context }
    };
  }
};

const deliveryMenu = (input, context) => {
  if (input === "0") return welcome(input, context); // Quick navigation shortcut back to main menu
  
  if (input === "1" || input === "2") {
    const vehicleType = input === "1" ? "Motorbike" : "Pickup";
    return {
      response: "END Request received! A Jetlink Bodsa agent will contact you immediately to confirm pickup and pricing details.",
      nextState: "welcome",
      nextContext: {}
    };
  }
  
  return {
    response: "END Invalid choice. Session ended. Goodbye from Jetlink Bodsa!",
    nextState: "welcome",
    nextContext: {}
  };
};

const trackOrder = (input, context) => {
  // input here contains whatever text/ID they typed in the previous screen
  if (!input || input.trim() === "") {
    return {
      response: "CON Invalid ID. Please enter a valid Tracking ID:",
      nextState: "trackOrder",
      nextContext: { ...context }
    };
  }

  return {
    response: `END Order status for ID ${input}: Package is currently dispatched with our rider and is en route to the destination.`,
    nextState: "welcome",
    nextContext: {}
  };
};

// Map every single handler function into the export object
module.exports = {
  welcome,
  mainMenuSelection,
  deliveryMenu,
  trackOrder
};