// config/redis.js
const { createClient } = require("redis");

const client = createClient({
    // redis:// redis protocol, localhost:6379 default redis host and port
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// listen for errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// variable is a flag that indicates whether the client is connected to the Redis server or not. Initially, it is set to false, meaning that the client is not connected. When the getClient function is called for the first time, it will attempt to connect to the Redis server. If the connection is successful, it will set the connected variable to true, indicating that the client is now connected. Subsequent calls to getClient will check this flag and return the already connected client without trying to connect again.
let connected = false;

// this is a reusable getter function that checks if the client is already connected to the Redis server. If it is not connected, it will attempt to connect and set the connected flag to true. Finally, it returns the client instance, allowing other parts of the application to use it for Redis operations.
async function getClient() {
  if (!connected) {
    await client.connect();
    connected = true;
  }
  return client;
}

module.exports = { getClient };