import redis from "../dbs/redisConnection.js";
import { SuperAdmin, User, UserSuperMappings } from "../models/index.js";
import jwt from "jsonwebtoken";
import { sendOtpToEmail } from "../utils/sendOTP.js";

// Create SuperAdmin
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

// send OTP
export const sendOtpSuperAdmin = async (req, res) => {
    try {
        const user = req.user;

        if (!user || !user.email) {
            return res.status(404).json({ message: "Associated user or email not found" });
        }

        // Generate OTP
        const otp = await sendOtpToEmail(user.email);

        // Use MOBILE as Redis key
        const key = `otp:${user.mobile}`;
        await redis.set(key, otp, "EX", 300);

        return res.json({ message: "OTP sent to registered email" });
    } catch (err) {
        console.error("Send OTP Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// LOGIN + VERIFY OTP
export const superAdminLogin = async (req, res) => {
    try {
        const { otp, mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ message: "Mobile required" });
        }

        const superAdmin = req.superAdmin;

        const key = `otp:${mobile}`;
        const storedOtp = await redis.get(key);

        console.log("Fetched OTP from Redis:", key, "=>", storedOtp);

        if (!storedOtp) {
            return res.status(400).json({ message: "OTP not sent or expired" });
        }

        if (storedOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP verified → delete from Redis
        await redis.del(key);

        // Generate JWT
        const token = jwt.sign(
            { id: superAdmin.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login successful",
            token,
            superAdmin,
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

// Get SuperAdmin by ID
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

// Update SuperAdmin
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

// Delete SuperAdmin
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