import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createClassType, deleteClassType, getAllClassTypes, getClassTypeById, updateClassType } from "../controllers/classTypeController.js";

const classTypeApis = express.Router();

classTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Class Types
 *     description: Manage class types
 */

/**
 * @swagger
 * /v1/class-type:
 *   post:
 *     summary: Create a new class type
 *     tags: [Class Types]
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
 *         description: Class type created
 */
classTypeApis.post("/", createClassType);

/**
 * @swagger
 * /v1/class-type:
 *   get:
 *     summary: Get all class types
 *     tags: [Class Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of class types
 */
classTypeApis.get("/", getAllClassTypes);

/**
 * @swagger
 * /v1/class-type/{id}:
 *   get:
 *     summary: Get class type by ID
 *     tags: [Class Types]
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
 *         description: Class type found
 *       404:
 *         description: Not found
 */
classTypeApis.get("/:id", getClassTypeById);

/**
 * @swagger
 * /v1/class-type/{id}:
 *   put:
 *     summary: Update class type
 *     tags: [Class Types]
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
 *         description: Class type updated
 *       404:
 *         description: Not found
 */
classTypeApis.patch("/:id", updateClassType);

/**
 * @swagger
 * /v1/class-type/{id}:
 *   delete:
 *     summary: Delete class type
 *     tags: [Class Types]
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
 *         description: Class type deleted
 *       404:
 *         description: Not found
 */
classTypeApis.delete("/:id", deleteClassType);

export default classTypeApis;
