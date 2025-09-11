import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAcademicType, deleteAcademicType, getAcademicTypeById, getAllAcademicType, updateAcademicType } from "../controllers/academicTypeController.js";

const academicTypeApis = express.Router();

academicTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Academic Types
 *     description: Manage academic types
 */

/**
 * @swagger
 * /academic-type:
 *   post:
 *     summary: Create a new academic type
 *     tags: [Academic Types]
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
 *         description: Academic type created
 */
academicTypeApis.post("/", createAcademicType);

/**
 * @swagger
 * /academic-type:
 *   get:
 *     summary: Get all academic types
 *     tags: [Academic Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of academic types
 */
academicTypeApis.get("/", getAllAcademicType);

/**
 * @swagger
 * /academic-type/{id}:
 *   get:
 *     summary: Get academic type by ID
 *     tags: [Academic Types]
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
 *         description: Academic type found
 *       404:
 *         description: Not found
 */
academicTypeApis.get("/:id", getAcademicTypeById);

/**
 * @swagger
 * /academic-type/{id}:
 *   put:
 *     summary: Update academic type
 *     tags: [Academic Types]
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
 *         description: Academic type updated
 *       404:
 *         description: Not found
 */
academicTypeApis.patch("/:id", updateAcademicType);

/**
 * @swagger
 * /academic-type/{id}:
 *   delete:
 *     summary: Delete academic type
 *     tags: [Academic Types]
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
 *         description: Academic type deleted
 *       404:
 *         description: Not found
 */
academicTypeApis.delete("/:id", deleteAcademicType);

export default academicTypeApis;
