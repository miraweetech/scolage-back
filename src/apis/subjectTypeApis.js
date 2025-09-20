import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createSubjectType, deleteSubjectType, getAllSubjectType, getSubjectTypeById, updateSubjectType } from "../controllers/subjectTypeController.js";

const SubjectTypeApi = express.Router();

SubjectTypeApi.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Subject Types
 *     description: Manage subject types
 */

/**
 * @swagger
 * /v1/subject-type:
 *   post:
 *     summary: Create a new subject type
 *     tags: [Subject Types]
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
 *         description: Subject type created
 */
SubjectTypeApi.post("/", createSubjectType);

/**
 * @swagger
 * /v1/subject-type:
 *   get:
 *     summary: Get all subject types
 *     tags: [Subject Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subject types
 */
SubjectTypeApi.get("/", getAllSubjectType);

/**
 * @swagger
 * /v1/subject-type/{id}:
 *   get:
 *     summary: Get subject type by ID
 *     tags: [Subject Types]
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
 *         description: Subject type found
 *       404:
 *         description: Not found
 */
SubjectTypeApi.get("/:id", getSubjectTypeById);

/**
 * @swagger
 * /v1/subject-type/{id}:
 *   put:
 *     summary: Update subject type
 *     tags: [Subject Types]
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
 *         description: Subject type updated
 *       404:
 *         description: Not found
 */
SubjectTypeApi.patch("/:id", updateSubjectType);

/**
 * @swagger
 * /v1/subject-type/{id}:
 *   delete:
 *     summary: Delete subject type
 *     tags: [Subject Types]
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
 *         description: Subject type deleted
 *       404:
 *         description: Not found
 */
SubjectTypeApi.delete("/:id", deleteSubjectType);

export default SubjectTypeApi;
