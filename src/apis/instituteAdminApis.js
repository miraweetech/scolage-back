import express from "express";
import {
  createInstituteAdmin,
  deleteInstituteAdmin,
  getAllInstituteAdmins,
  getInstituteAdminById,
  InstituteAdminLogin,
  sendOtpInstituteAdmin,
  updateInstituteAdmin,
} from "../controllers/instituteAdminControllers.js";
import { instituteAuthValidationMW } from "../middleware/instituteAuthValidationMW.js";

const instituteAdminApis = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Institute Admins
 *     description: Institute Admin management APIs
 */

/**
 * @swagger
 * /v1/institute-admin/register:
 *   post:
 *     summary: Register a new institute admin
 *     tags: [Institute Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@college.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               fname:
 *                 type: string
 *                 example: Raj
 *               lname:
 *                 type: string
 *                 example: Patel
 *     responses:
 *       201:
 *         description: Institute Admin registered successfully
 */
instituteAdminApis.post("/register", createInstituteAdmin);

/**
 * @swagger
 * /v1/institute-admin/send-otp:
 *   post:
 *     summary: Send OTP to institute admin
 *     tags: [Institute Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@college.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid request
 */
instituteAdminApis.post("/send-otp", instituteAuthValidationMW, sendOtpInstituteAdmin);

/**
 * @swagger
 * /v1/institute-admin/login:
 *   post:
 *     summary: Login as institute admin
 *     tags: [Institute Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@college.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
instituteAdminApis.post("/login", instituteAuthValidationMW, InstituteAdminLogin);

/**
 * @swagger
 * /v1/institute-admin/all:
 *   get:
 *     summary: Get all institute admins
 *     tags: [Institute Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all institute admins
 */
instituteAdminApis.get("/all", getAllInstituteAdmins);

/**
 * @swagger
 * /v1/institute-admin/{id}:
 *   get:
 *     summary: Get an institute admins by ID
 *     tags: [Institute Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Institute Admins details
 *       404:
 *         description: Institute Admins not found
 */
instituteAdminApis.get("/:id", getInstituteAdminById);

/**
 * @swagger
 * /v1/institute-admin/{id}:
 *   patch:
 *     summary: Update an institute admins by ID
 *     tags: [Institute Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: College
 *     responses:
 *       200:
 *         description: Institute Admin updated successfully
 *       404:
 *         description: Institute Admin not found
 */
instituteAdminApis.patch("/:id", updateInstituteAdmin);

/**
 * @swagger
 * /v1/institute-admin/{id}:
 *   delete:
 *     summary: Delete an institute admin by ID
 *     tags: [Institute Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: Institute Admin deleted successfully
 *       404:
 *         description: Institute Admin not found
 */
instituteAdminApis.delete("/:id", deleteInstituteAdmin);

export default instituteAdminApis;
