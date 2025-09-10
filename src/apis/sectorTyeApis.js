import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createSectorType, deleteSectorType, getAllSectorTypes, getSectorTypeById, updateSectorType } from "../controllers/sectorTypeController.js";

const sectorType = express.Router();

sectorType.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Sector Types
 *     description: Manage sector types
 */

/**
 * @swagger
 * /sector-type:
 *   post:
 *     summary: Create a new sector type
 *     tags: [Sector Types]
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
 *         description: Sector type created
 */
sectorType.post("/", createSectorType);

/**
 * @swagger
 * /sector-type:
 *   get:
 *     summary: Get all sector types
 *     tags: [Sector Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sector types
 */
sectorType.get("/", getAllSectorTypes);

/**
 * @swagger
 * /sector-type/{id}:
 *   get:
 *     summary: Get sector type by ID
 *     tags: [Sector Types]
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
 *         description: Sector type found
 *       404:
 *         description: Not found
 */
sectorType.get("/:id", getSectorTypeById) ;

/**
 * @swagger
 * /sector-type/{id}:
 *   put:
 *     summary: Update sector type
 *     tags: [Sector Types]
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
 *         description: Sector type updated
 *       404:
 *         description: Not found
 */
sectorType.patch("/:id", updateSectorType);

/**
 * @swagger
 * /sector-type/{id}:
 *   delete:
 *     summary: Delete sector type
 *     tags: [Sector Types]
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
 *         description: Sector type deleted
 *       404:
 *         description: Not found
 */
sectorType.delete("/:id", deleteSectorType);

export default sectorType;
