import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createMediaType, deleteMediaType, getAllMediaType, getMediaTypeById, updateMediaType } from "../controllers/mediaTypeControllers.js";

const mediaTypeApis = express.Router();

mediaTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Media Types
 *     description: Manage media types
 */

/**
 * @swagger
 * /v1/media-type:
 *   post:
 *     summary: Create a new media type
 *     tags: [Media Types]
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
 *         description: Media type created
 */
mediaTypeApis.post("/", createMediaType);

/**
 * @swagger
 * /v1/media-type:
 *   get:
 *     summary: Get all media types
 *     tags: [Media Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of media types
 */
mediaTypeApis.get("/", getAllMediaType);

/**
 * @swagger
 * /v1/media-type/{id}:
 *   get:
 *     summary: Get media type by ID
 *     tags: [Media Types]
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
 *         description: Media type found
 *       404:
 *         description: Not found
 */
mediaTypeApis.get("/:id", getMediaTypeById);

/**
 * @swagger
 * /v1/media-type/{id}:
 *   put:
 *     summary: Update media type
 *     tags: [Media Types]
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
 *         description: Media type updated
 *       404:
 *         description: Not found
 */
mediaTypeApis.patch("/:id", updateMediaType);

/**
 * @swagger
 * /v1/media-type/{id}:
 *   delete:
 *     summary: Delete media type
 *     tags: [Media Types]
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
 *         description: Media type deleted
 *       404:
 *         description: Not found
 */
mediaTypeApis.delete("/:id", deleteMediaType);

export default mediaTypeApis;
