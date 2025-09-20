import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createShiftType, deleteShiftType, getAllShiftType, getShiftTypeById, updateShiftType } from "../controllers/shiftTypeControllers.js";

const shiftTypeApis = express.Router();

shiftTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Shift Types
 *     description: Manage shift types
 */

/**
 * @swagger
 * /v1/shift-type:
 *   post:
 *     summary: Create a new shift type
 *     tags: [Shift Types]
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
 *         description: Shift type created
 */
shiftTypeApis.post("/", createShiftType);

/**
 * @swagger
 * /v1/shift-type:
 *   get:
 *     summary: Get all shift types
 *     tags: [Shift Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shift types
 */
shiftTypeApis.get("/", getAllShiftType);

/**
 * @swagger
 * /v1/shift-type/{id}:
 *   get:
 *     summary: Get shift type by ID
 *     tags: [Shift Types]
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
 *         description: Shift type found
 *       404:
 *         description: Not found
 */
shiftTypeApis.get("/:id", getShiftTypeById);

/**
 * @swagger
 * /v1/Shift-type/{id}:
 *   put:
 *     summary: Update Shift type
 *     tags: [Shift Types]
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
 *         description: Shift type updated
 *       404:
 *         description: Not found
 */
shiftTypeApis.patch("/:id", updateShiftType);

/**
 * @swagger
 * /v1/shift-type/{id}:
 *   delete:
 *     summary: Delete shift type
 *     tags: [Shift Types]
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
 *         description: Shift type deleted
 *       404:
 *         description: Not found
 */
shiftTypeApis.delete("/:id", deleteShiftType);

export default shiftTypeApis;
