// import express from "express";
// import { getAllSuperAdmins, registerSuperAdmin, sendOtpSuperAdmin, superAdminLogin } from "../controllers/superAdminControllers.js";
// import { authValidationMW } from "../middleware/authValidationMW.js";

// const superAdminApis = express.Router()

// superAdminApis.post('/register', registerSuperAdmin)
// superAdminApis.post("/send-otp", authValidationMW, sendOtpSuperAdmin);
// superAdminApis.post("/login", authValidationMW, superAdminLogin);

// superAdminApis.get('/all', getAllSuperAdmins)

// export default superAdminApis;

// src/apis/superAdminApis.js
import express from "express";
import {
  getAllSuperAdmins,
  registerSuperAdmin,
  sendOtpSuperAdmin,
  superAdminLogin,
} from "../controllers/superAdminControllers.js";
import { authValidationMW } from "../middleware/authValidationMW.js";

const superAdminApis = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Super Admin
 *     description: Super Admin management APIs
 */

/**
 * @swagger
 * /v1/super-admin/register:
 *   post:
 *     summary: Register a new super admin
 *     tags: [Super Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fname:
 *                 type: string
 *                 example: Mira
 *               lname:
 *                 type: string
 *                 example: Patel
 *               email:
 *                 type: string
 *                 example: mira@example.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               user_name:
 *                 type: string
 *                 example: miraAdmin
 *     responses:
 *       201:
 *         description: Super Admin registered successfully
 */
superAdminApis.post("/register", registerSuperAdmin);

/**
 * @swagger
 * /v1/super-admin/send-otp:
 *   post:
 *     summary: Send OTP to super admin
 *     tags: [Super Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mira@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
superAdminApis.post("/send-otp", authValidationMW, sendOtpSuperAdmin);

/**
 * @swagger
 * /v1/super-admin/login:
 *   post:
 *     summary: Super Admin login with OTP
 *     tags: [Super Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: mira@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
superAdminApis.post("/login", authValidationMW, superAdminLogin);

/**
 * @swagger
 * /v1/super-admin/all:
 *   get:
 *     summary: Get all super admins
 *     tags: [Super Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of super admins
 */
superAdminApis.get("/all", getAllSuperAdmins);

export default superAdminApis;
