import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createDesignationType, deleteDesignationType, getAllDesignationType, getDesignationTypeById, updateDesignationType } from "../controllers/designationTypeController.js";

const DesignationTypeApi = express.Router();

DesignationTypeApi.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Designation Types
 *     description: Manage designation types
 */

/**
 * @swagger
 * /designation-type:
 *   post:
 *     summary: Create a new designation type
 *     tags: [Designation Types]
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
 *         description: Designation type created
 */
DesignationTypeApi.post("/", createDesignationType);

/**
 * @swagger
 * /designation-type:
 *   get:
 *     summary: Get all designation types
 *     tags: [Designation Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of designation types
 */
DesignationTypeApi.get("/", getAllDesignationType);

/**
 * @swagger
 * /designation-type/{id}:
 *   get:
 *     summary: Get designation type by ID
 *     tags: [Designation Types]
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
 *         description: Designation type found
 *       404:
 *         description: Not found
 */
DesignationTypeApi.get("/:id", getDesignationTypeById);

/**
 * @swagger
 * /designation-type/{id}:
 *   put:
 *     summary: Update designation type
 *     tags: [Designation Types]
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
 *         description: Designation type updated
 *       404:
 *         description: Not found
 */
DesignationTypeApi.patch("/:id", updateDesignationType);

/**
 * @swagger
 * /designation-type/{id}:
 *   delete:
 *     summary: Delete designation type
 *     tags: [Designation Types]
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
 *         description: designation type deleted
 *       404:
 *         description: Not found
 */
DesignationTypeApi.delete("/:id", deleteDesignationType);

export default DesignationTypeApi;
