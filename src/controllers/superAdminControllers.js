import redis from "../configs/redisConnection.js";
import { SuperAdmin, User, UserSuperMappings } from "../models/index.js";
import jwt from "jsonwebtoken";
import { sendOtpToEmail } from "../services/otp.services.js";
import { v4 as uuidv4 } from "uuid";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export const registerSuperAdmin = async (req, res) => {
    try {
        const {
            emergency_code,
            email,
            mobile,
            last_login,
            fname,
            lname,
            user_name,
            profile_image,
            is_native,
            is_active,
            status
        } = req.body;

        const userData = { emergency_code, email, mobile, last_login };

        const superAdminData = { fname, lname, user_name, profile_image, is_native, is_active, status };

        const userSuperMappingData = { status };

        const createdUser = await User.create(userData);

        const createdSuperAdmin = await SuperAdmin.create({
            ...superAdminData,
            created_by: createdUser.id
        });

        const createdMapping = await UserSuperMappings.create({
            ...userSuperMappingData,
            user_id: createdUser.id,
            super_admin_id: createdSuperAdmin.super_admin_id
        });

        res.status(201).json({ message: "SuperAdmin create successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message, details: error.errors });
    }
};

export const sendOtpSuperAdmin = async (req, res) => {
    try {
        const user = req.user;
        const { reason } = req.body;

        if (!user || !user.email) {
            return res.status(404).json({ message: "Associated user or email not found" });
        }
        const otp = await sendOtpToEmail(user.email);

        const key = `otp:${user.mobile}`;
        const dataToStore = {
            otp,
            reason,
            user: {
                id: user.id,
                email: user.email,
                mobile: user.mobile
            }
        };

        await redis.set(key, JSON.stringify(dataToStore), "EX", 300);

        const stored = await redis.get(key);
        console.log("Fetched OTP from Redis:", key, "=>", stored);
        return res.status(200).json({
            status: "success",
            message: `OTP sent successfully to ${user.email} for ${reason}`,
            reason
        });
    } catch (err) {
        console.error("Send OTP Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const superAdminLogin = async (req, res) => {
    try {
        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({ message: "OTP required" });
        }

        const user = req.user;
        const superAdmin = req.superAdmin;

        const key = user.mobile
            ? `otp:${user.mobile}`
            : `otp:${user.email}`;

        const storedData = await redis.get(key);
        console.log("Fetched OTP from Redis:", key, "=>", storedData);

        if (!storedData) {
            return res.status(400).json({ message: "OTP not sent or expired" });
        }

        const parsedData = JSON.parse(storedData);

        if (parsedData.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        await redis.del(key);

        // Generate token + uuid
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "24h" });
        const uuid = uuidv4();
        const encryptedKey = cryptr.encrypt(user.id.toString());

        // Save in Redis
        await redis.set(`auth:tokens:${user.id}`, token, "EX", 86400);
        await redis.set(`auth:map:${uuid}`, encryptedKey, "EX", 86400);


        return res.status(200).json({
            message: "Login successful",
            uuid,
            ...superAdmin
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get All SuperAdmins
export const getAllSuperAdmins = async (req, res) => {
    try {
        const superAdmins = await SuperAdmin.findAll({
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "email", "mobile"]
                }
            ]
        });
        res.status(200).json(superAdmins);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching super admins",
            error: error.message
        });
    }
}

export const getSuperAdminById = async (req, res) => {
    try {
        const superAdmin = await SuperAdmin.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "email", "mobile"]
                }
            ]
        });
        if (!superAdmin) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }
        res.status(200).json(superAdmin);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching super admin",
            error: error.message
        });
    }
};

export const updateSuperAdmin = async (req, res) => {
    try {
        const [updated] = await SuperAdmin.update(
            { ...req.body, modified_at: new Date() },
            { where: { super_admin_id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }
        const updatedSuperAdmin = await SuperAdmin.findByPk(req.params.id);
        res.status(200).json(updatedSuperAdmin);
    } catch (error) {
        res.status(400).json({
            message: "Error updating super admin",
            error: error.message
        });
    }
};

export const deleteSuperAdmin = async (req, res) => {
    try {
        await UserSuperMappings.destroy({
            where: { super_admin_id: req.params.id }
        });

        const deleted = await SuperAdmin.destroy({
            where: { super_admin_id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "SuperAdmin not found" });
        }
        res.status(200).json({ message: "SuperAdmin deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting super admin",
            error: error.message
        });
    }
};