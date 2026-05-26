// // index.js
// require("dotenv").config();
// const express = require("express");

// const app = express();

// // IMPORTANT: AT posts `application/x-www-form-urlencoded`, NOT JSON.
// app.use(express.urlencoded({ extended: false }));

// app.post("/ussd", (req, res) => {
//   const { sessionId, serviceCode, phoneNumber, text } = req.body;

//   console.log("USSD hit:", { sessionId, serviceCode, phoneNumber, text });

//   let response = "";

//   if (text === "") {
//     // First page of the session.
//     response = "CON Welcome to Jetlink Boda\n";
//     response += "1. Request a ride\n";
//     response += "2. My rides\n";
//     response += "3. Support";
//   } else if (text === "1") {
//     response = "END You picked: Request a ride. We will come back to this on Day 2.";
//   } else if (text === "2") {
//     response = "END You picked: My rides.";
//   } else if (text === "3") {
//     response = "END You picked: Support.";
//   } else {
//     response = "END Invalid option. Please try again.";
//   }

//   res.set("Content-Type", "text/plain");
//   res.send(response);
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`USSD server running on :${PORT}`);
// });


// index.js
require("dotenv").config();
const express = require("express");
const session = require("./sessionStore");
const states = require("./states");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post("/ussd", async (req, res) => {
  const { sessionId, text } = req.body;

  const parts = text.split("*");
  const latestInput = text === "" ? "" : parts[parts.length - 1];

  const { state, context } = await session.get(sessionId);
  const handler = states[state] || states.welcome;

  const { response, nextState, nextContext } = handler(latestInput, context);

  if (response.startsWith("END")) {
    await session.destroy(sessionId);
  } else {
    await session.set(sessionId, { state: nextState, context: nextContext });
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

app.listen(process.env.PORT || 5001, () => {
  console.log("USSD server running");
});