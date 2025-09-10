import express from "express";
import {
  createInstituteType,
  deleteInstituteType,
  getAllInstituteTypes,
  getInstituteTypeById,
  updateInstituteType,
} from "../controllers/instituteTypeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const instituteTypeApis = express.Router();

instituteTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Institute Types
 *     description: Manage different types of institutes
 */

/**
 * @swagger
 * /v1/institute-type:
 *   post:
 *     summary: Create a new institute type
 *     tags: [Institute Types]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: University
 *     responses:
 *       201:
 *         description: Institute type created successfully
 */
instituteTypeApis.post("/", createInstituteType);

/**
 * @swagger
 * /v1/institute-type:
 *   get:
 *     summary: Get all institute types
 *     tags: [Institute Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of institute types
 */
instituteTypeApis.get("/", getAllInstituteTypes);

/**
 * @swagger
 * /v1/institute-type/{id}:
 *   get:
 *     summary: Get an institute type by ID
 *     tags: [Institute Types]
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
 *         description: Institute type details
 *       404:
 *         description: Institute type not found
 */
instituteTypeApis.get("/:id", getInstituteTypeById);

/**
 * @swagger
 * /v1/institute-type/{id}:
 *   patch:
 *     summary: Update an institute type by ID
 *     tags: [Institute Types]
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
 *         description: Institute type updated successfully
 *       404:
 *         description: Institute type not found
 */
instituteTypeApis.patch("/:id", updateInstituteType);

/**
 * @swagger
 * /v1/institute-type/{id}:
 *   delete:
 *     summary: Delete an institute type by ID
 *     tags: [Institute Types]
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
 *         description: Institute type deleted successfully
 *       404:
 *         description: Institute type not found
 */
instituteTypeApis.delete("/:id", deleteInstituteType);

export default instituteTypeApis;
