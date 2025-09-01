// import dotenv from "dotenv";
// import Redis from "ioredis";

// dotenv.config();

// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASSWORD,
// });

// console.log("Redis ENV:", process.env.REDIS_HOST, process.env.REDIS_PORT);

// redis.on("connect", () => {
//     console.log("Redis Connected");
// });

// redis.on("error", (err) => {
//     console.error("Redis Error:", err);
// });

// export default redis

import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
    console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
    console.error("❌ Redis Error:", err);
});

export default redis;
