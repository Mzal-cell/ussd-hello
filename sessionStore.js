// sessionStore.js
// redis based session manager for USSD sessions
const { getClient } = require("./redis");

const SESSION_TTL = 300; // 5 minutes -- a bit more than the USSD max.

// creating consistent redis key name
// Redis naming pattern is app:resource :id
function key(sessionId) {
  return `ussd:session:${sessionId}`;
}

// retrieves session
async function get(sessionId) {
  const client = await getClient();
  const raw = await client.get(key(sessionId));
  if (!raw) {
    return { state: "welcome", context: {} };
  }
  return JSON.parse(raw);
}

async function set(sessionId, data) {
  const client = await getClient();
  await client.set(key(sessionId), JSON.stringify(data), { EX: SESSION_TTL });
}

// destroys session both finished and expired sessions and unfinished sessions that have been abandoned by users
async function destroy(sessionId) {
  const client = await getClient();
  await client.del(key(sessionId));
}

module.exports = { get, set, destroy };