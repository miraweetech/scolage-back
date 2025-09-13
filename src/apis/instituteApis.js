import express from "express";
import {
  createInstitute,
  deleteInstitute,
  getAllInstitutes,
  getInstituteById,
  updateInstitute,
} from "../controllers/instituteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const instituteApis = express.Router();

// Apply authentication middleware for all institute routes
instituteApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Institutes
 *     description: Institute management APIs
 */

/**
 * @swagger
 * /v1/institute:
 *   post:
 *     summary: Create a new institute
 *     tags: [Institutes]
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
 *                 example: Sardar Patel University
 *               address:
 *                 type: string
 *                 example: Vallabh Vidyanagar, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Institute created successfully
 */
instituteApis.post("/", createInstitute);

/**
 * @swagger
 * /v1/institute:
 *   get:
 *     summary: Get all institutes
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of institutes
 */
instituteApis.get("/", getAllInstitutes);

/**
 * @swagger
 * /v1/institute/{id}:
 *   get:
 *     summary: Get an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Institute details
 *       404:
 *         description: Institute not found
 */
instituteApis.get("/:id", getInstituteById);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/:id", updateInstitute);

/**
 * @swagger
 * /v1/institute/{id}:
 *   delete:
 *     summary: Delete an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Institute deleted successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.delete("/:id", deleteInstitute);

export default instituteApis;
