import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createHighlightsType, deleteHighlightsTyps, getAllHighlightsTyps, getHighlightsTypsById, updateHighlightsTyps } from "../controllers/highlightsTypeController.js";

const highlightsTypeApis = express.Router();

highlightsTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Highlights Types
 *     description: Manage highlights types
 */

/**
 * @swagger
 * /highlights-type:
 *   post:
 *     summary: Create a new highlights type
 *     tags: [Highlights Types]
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
 *         description: Highlights type created
 */
highlightsTypeApis.post("/", createHighlightsType);

/**
 * @swagger
 * /highlights-type:
 *   get:
 *     summary: Get all highlights types
 *     tags: [Highlights Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of highlights types
 */
highlightsTypeApis.get("/", getAllHighlightsTyps);

/**
 * @swagger
 * /highlights-type/{id}:
 *   get:
 *     summary: Get highlights type by ID
 *     tags: [Highlights Types]
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
 *         description: Highlights type found
 *       404:
 *         description: Not found
 */
highlightsTypeApis.get("/:id", getHighlightsTypsById);

/**
 * @swagger
 * /highlights-type/{id}:
 *   put:
 *     summary: Update highlights type
 *     tags: [Highlights Types]
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
 *         description: Highlights type updated
 *       404:
 *         description: Not found
 */
highlightsTypeApis.patch("/:id", updateHighlightsTyps);

/**
 * @swagger
 * /highlights-type/{id}:
 *   delete:
 *     summary: Delete highlights type
 *     tags: [Highlights Types]
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
 *         description: Highlights type deleted
 *       404:
 *         description: Not found
 */
highlightsTypeApis.delete("/:id", deleteHighlightsTyps);

export default highlightsTypeApis;
