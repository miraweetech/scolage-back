import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createEmailType, deleteEmailType, getAllEmailTypes, getEmailTypeById, updateEmailType } from "../controllers/emailTypeController.js";

const emailTypeApis = express.Router();

emailTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Email Types
 *     description: Manage email types
 */

/**
 * @swagger
 * /v1/email-type:
 *   post:
 *     summary: Create a new email type
 *     tags: [Email Types]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email type created
 */
emailTypeApis.post("/", createEmailType);

/**
 * @swagger
 * /v1/email-type:
 *   get:
 *     summary: Get all email types
 *     tags: [Email Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of email types
 */
emailTypeApis.get("/", getAllEmailTypes);

/**
 * @swagger
 * /v1/email-type/{id}:
 *   get:
 *     summary: Get email type by ID
 *     tags: [Email Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email type found
 *       404:
 *         description: Not found
 */
emailTypeApis.get("/:id", getEmailTypeById);

/**
 * @swagger
 * /v1/email-type/{id}:
 *   put:
 *     summary: Update email type
 *     tags: [Email Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email type updated
 *       404:
 *         description: Not found
 */
emailTypeApis.patch("/:id", updateEmailType);

/**
 * @swagger
 * /v1/email-type/{id}:
 *   delete:
 *     summary: Delete email type
 *     tags: [Email Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email type deleted
 *       404:
 *         description: Not found
 */
emailTypeApis.delete("/:id", deleteEmailType);

export default emailTypeApis;
