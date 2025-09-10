import redis from "../configs/redisConnection.js";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export const authMiddleware = async (req, res, next) => {
    try {
        let uuid = null;

        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            uuid = authHeader.split(" ")[1];
        } else if (req.headers.uuid) {
            uuid = req.headers.uuid;
        }

        if (!uuid) {
            return res.status(401).json({ message: "token required" });
        }

        const encryptedUserId = await redis.get(`auth:map:${uuid}`);
        if (!encryptedUserId) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const userId = cryptr.decrypt(encryptedUserId);
        req.userId = userId;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
