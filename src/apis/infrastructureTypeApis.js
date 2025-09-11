import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createInfrastructureType, deleteInfrastructureType, getAllInfrastructureTypes, getInfrastructureTypeById, updateInfrastructureType } from "../controllers/infrastructureTypeController.js";

const infrastructureTypeApis = express.Router();

infrastructureTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Infrastructure Types
 *     description: Manage infrastructure types
 */

/**
 * @swagger
 * /infrastructure-type:
 *   post:
 *     summary: Create a new infrastructure type
 *     tags: [Infrastructure Types]
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
 *         description: Infrastructure type created
 */
infrastructureTypeApis.post("/", createInfrastructureType);

/**
 * @swagger
 * /infrastructure-type:
 *   get:
 *     summary: Get all infrastructure types
 *     tags: [Infrastructure Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of infrastructure types
 */
infrastructureTypeApis.get("/", getAllInfrastructureTypes);

/**
 * @swagger
 * /infrastructure-type/{id}:
 *   get:
 *     summary: Get infrastructure type by ID
 *     tags: [Infrastructure Types]
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
 *         description: infrastructure type found
 *       404:
 *         description: Not found
 */
infrastructureTypeApis.get("/:id", getInfrastructureTypeById);

/**
 * @swagger
 * /infrastructure-type/{id}:
 *   put:
 *     summary: Update infrastructure type
 *     tags: [Infrastructure Types]
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
 *         description: infrastructure type updated
 *       404:
 *         description: Not found
 */
infrastructureTypeApis.patch("/:id", updateInfrastructureType);

/**
 * @swagger
 * /infrastructure-type/{id}:
 *   delete:
 *     summary: Delete infrastructure type
 *     tags: [Infrastructure Types]
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
 *         description: infrastructure type deleted
 *       404:
 *         description: Not found
 */
infrastructureTypeApis.delete("/:id", deleteInfrastructureType);

export default infrastructureTypeApis;
