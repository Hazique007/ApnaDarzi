// import redis from "redis";
// const client = redis.createClient({
//   url: "redis://localhost:6379",
// });

// client.on("connect", () => {
//   console.log("Connected to Redis");
// });

// client.on("error", (err) => {
//   console.error("Redis error:", err);
// });

// (async () => {
//   await client.connect();
// })();

// export default client;
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
