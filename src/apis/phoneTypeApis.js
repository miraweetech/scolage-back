import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPhoneType, deletePhoneType, getAllPhoneTypes, getPhoneTypeById, updatePhoneType } from "../controllers/phoneTypeController.js";

const phoneTypeApis = express.Router();

phoneTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Phone Types
 *     description: Manage Phone types
 */

/**
 * @swagger
 * /v1/phone-type:
 *   post:
 *     summary: Create a new phone type
 *     tags: [Phone Types]
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
 *         description: Phone type created
 */
phoneTypeApis.post("/", createPhoneType);

/**
 * @swagger
 * /v1/phone-type:
 *   get:
 *     summary: Get all phone types
 *     tags: [Phone Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of phone types
 */
phoneTypeApis.get("/", getAllPhoneTypes);

/**
 * @swagger
 * /v1/phone-type/{id}:
 *   get:
 *     summary: Get phone type by ID
 *     tags: [Phone Types]
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
 *         description: Phone type found
 *       404:
 *         description: Not found
 */
phoneTypeApis.get("/:id", getPhoneTypeById);

/**
 * @swagger
 * /v1/phone-type/{id}:
 *   put:
 *     summary: Update phone type
 *     tags: [Phone Types]
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
 *         description: Phone type updated
 *       404:
 *         description: Not found
 */
phoneTypeApis.patch("/:id", updatePhoneType);

/**
 * @swagger
 * /v1/phone-type/{id}:
 *   delete:
 *     summary: Delete phone type
 *     tags: [Phone Types]
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
 *         description: Phone type deleted
 *       404:
 *         description: Not found
 */
phoneTypeApis.delete("/:id", deletePhoneType);

export default phoneTypeApis;
