import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createYoutubeLinkType, deleteYoutubeLinkType, getAllYoutubeLinkType, getYoutubeLinkTypeById, updateYoutubeLinkType } from "../controllers/youtubeLinkTypeControllers.js";

const youtubeLinkTypeApis = express.Router();

youtubeLinkTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: YoutubeLink Types
 *     description: Manage youtubeLink types
 */

/**
 * @swagger
 * /v1/youtubeLink-type:
 *   post:
 *     summary: Create a new youtubeLink type
 *     tags: [YoutubeLink Types]
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
 *         description: YoutubeLink type created
 */
youtubeLinkTypeApis.post("/", createYoutubeLinkType);

/**
 * @swagger
 * /v1/youtubeLink-type:
 *   get:
 *     summary: Get all socialMedia types
 *     tags: [YoutubeLink Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of youtubeLink types
 */
youtubeLinkTypeApis.get("/", getAllYoutubeLinkType);

/**
 * @swagger
 * /v1/youtubeLink-type/{id}:
 *   get:
 *     summary: Get youtubeLink type by ID
 *     tags: [YoutubeLink Types]
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
 *         description: YoutubeLink type found
 *       404:
 *         description: Not found
 */
youtubeLinkTypeApis.get("/:id", getYoutubeLinkTypeById);

/**
 * @swagger
 * /v1/youtubeLink-type/{id}:
 *   put:
 *     summary: Update youtubeLink type
 *     tags: [YoutubeLink Types]
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
 *         description: YoutubeLink type updated
 *       404:
 *         description: Not found
 */
youtubeLinkTypeApis.patch("/:id", updateYoutubeLinkType);

/**
 * @swagger
 * /v1/youtubeLink-type/{id}:
 *   delete:
 *     summary: Delete youtubeLink type
 *     tags: [YoutubeLink Types]
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
 *         description: YoutubeLink type deleted
 *       404:
 *         description: Not found
 */
youtubeLinkTypeApis.delete("/:id", deleteYoutubeLinkType);

export default youtubeLinkTypeApis;
