import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createInstituteSystemType,
  deleteInstituteSystemType,
  getAllInstituteSystemType,
  getInstituteSystemTypeById,
  updateInstituteSystemType,
} from "../controllers/instituteSystemTypeController.js";

const instituteSystemType = express.Router();

instituteSystemType.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Institute System Types
 *     description: Manage institute system types
 */

/**
 * @swagger
 * /v1/institute-system-type:
 *   post:
 *     summary: Create a new institute system type
 *     tags: [Institute System Types]
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
 *         description: Institute system type created
 */
instituteSystemType.post("/", createInstituteSystemType);

/**
 * @swagger
 * /v1/institute-system-type:
 *   get:
 *     summary: Get all institute system types
 *     tags: [Institute System Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of institute system types
 */
instituteSystemType.get("/", getAllInstituteSystemType);

/**
 * @swagger
 * /v1/institute-system-type/{id}:
 *   get:
 *     summary: Get institute system type by ID
 *     tags: [Institute System Types]
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
 *         description: Institute system type found
 *       404:
 *         description: Not found
 */
instituteSystemType.get("/:id", getInstituteSystemTypeById);

/**
 * @swagger
 * /v1/institute-system-type/{id}:
 *   put:
 *     summary: Update institute system type
 *     tags: [Institute System Types]
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
 *         description: Institute system type updated
 *       404:
 *         description: Not found
 */
instituteSystemType.patch("/:id", updateInstituteSystemType);

/**
 * @swagger
 * /v1/institute-system-type/{id}:
 *   delete:
 *     summary: Delete institute system type
 *     tags: [Institute System Types]
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
 *         description: Institute system type deleted
 *       404:
 *         description: Not found
 */
instituteSystemType.delete("/:id", deleteInstituteSystemType);

export default instituteSystemType;
