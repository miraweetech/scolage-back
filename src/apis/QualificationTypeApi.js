import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createQualificationType, deleteQualificationType, getAllQualificationType, getQualificationTypeById, updateQualificationType } from "../controllers/qualificationTypeController.js";

const QualificationTypeApi = express.Router();

QualificationTypeApi.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Qualification Types
 *     description: Manage qualification types
 */

/**
 * @swagger
 * /v1/qualification-type:
 *   post:
 *     summary: Create a new qualification type
 *     tags: [Qualification Types]
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
 *         description: Qualification type created
 */
QualificationTypeApi.post("/", createQualificationType);

/**
 * @swagger
 * /v1/qualification-type:
 *   get:
 *     summary: Get all qualification types
 *     tags: [Qualification Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of qualification types
 */
QualificationTypeApi.get("/", getAllQualificationType);

/**
 * @swagger
 * /v1/qualification-type/{id}:
 *   get:
 *     summary: Get qualification type by ID
 *     tags: [Qualification Types]
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
 *         description: Qualification type found
 *       404:
 *         description: Not found
 */
QualificationTypeApi.get("/:id", getQualificationTypeById);

/**
 * @swagger
 * /v1/qualification-type/{id}:
 *   put:
 *     summary: Update qualification type
 *     tags: [Qualification Types]
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
 *         description: Qualification type updated
 *       404:
 *         description: Not found
 */
QualificationTypeApi.patch("/:id", updateQualificationType);

/**
 * @swagger
 * /v1/qualification-type/{id}:
 *   delete:
 *     summary: Delete qualification type
 *     tags: [Qualification Types]
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
 *         description: Qualification type deleted
 *       404:
 *         description: Not found
 */
QualificationTypeApi.delete("/:id", deleteQualificationType);

export default QualificationTypeApi;
