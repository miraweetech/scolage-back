import redis from "../configs/redisConnection.js";
import { Institute, InstituteAdmin, User, UserInstituteMappings } from "../models/index.js";
import { sendOtpToEmail } from "../services/otp.services.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export const createInstituteAdmin = async (req, res) => {
  try {
    const {
      emergency_code,
      email,
      mobile,
      last_login,
      fname,
      lname,
      user_name,
      institute_work_id,
      dob,
      profile_image,
      is_native,
      is_active,
      status,
      institute_id
    } = req.body;

    const institute = await Institute.findByPk(institute_id);
    if (!institute) {
      return res.status(404).json({ message: "Institute not found" });
    }

    const existingAdminMapping = await UserInstituteMappings.findOne({
      where: { institute_id },
      include: [{ model: InstituteAdmin, as: "instituteAdmin" }]
    });

    if (existingAdminMapping) {
      return res.status(400).json({ message: "This institute already has an admin" });
    }

    const createdUser = await User.create({
      emergency_code,
      email,
      mobile,
      last_login
    });

    const createdInstituteAdmin = await InstituteAdmin.create({
      fname,
      lname,
      user_name,
      institute_work_id,
      dob,
      profile_image,
      is_native,
      is_active,
      status
    });

    await UserInstituteMappings.create({
      user_id: createdUser.id,
      institute_admin_id: createdInstituteAdmin.institute_admin_id,
      institute_id: institute.id
    });

    res.status(201).json({
      message: "Institute Admin created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message, details: error.errors });
  }
};

export const sendOtpInstituteAdmin = async (req, res) => {
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
    console.log("Stored OTP in Redis:", key, "=>", stored);

    return res.json({
      message: `OTP sent successfully to ${user.email} for ${reason}`,
      reason
    });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const InstituteAdminLogin = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP required" });
    }

    const user = req.user;
    const instituteAdmin = req.instituteAdmin;

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
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
    const uuid = uuidv4();
    const encryptedKey = cryptr.encrypt(user.id.toString());

    // Save in Redis
    await redis.set(`auth:tokens:${user.id}`, token, "EX", 3600);
    await redis.set(`auth:map:${uuid}`, encryptedKey, "EX", 3600);

    return res.json({
      message: "Login successful",
      uuid,
      ...instituteAdmin
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllInstituteAdmins = async (req, res) => {
  try {
    const instituteAdmins = await InstituteAdmin.findAll({
      // include: [
      //     {
      //         model: User,
      //         as: "creator",
      //         attributes: ["id", "email", "mobile"]
      //     }
      // ]
    });
    res.status(200).json(instituteAdmins);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching institute admins",
      error: error.message
    });
  }
}