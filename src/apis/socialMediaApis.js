import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createSocialMediaType, deletesocialMediaType, getAllSocialMediaType, getSocialMediaTypeById, updatesocialMediaType } from "../controllers/socialMediaTypeController.js";

const socialMediaTypeApis = express.Router();

socialMediaTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: SocialMedia Types
 *     description: Manage socialMedia types
 */

/**
 * @swagger
 * /v1/socialMedia-type:
 *   post:
 *     summary: Create a new socialMedia type
 *     tags: [SocialMedia Types]
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
 *         description: SocialMedia type created
 */
socialMediaTypeApis.post("/", createSocialMediaType);

/**
 * @swagger
 * /v1/socialMedia-type:
 *   get:
 *     summary: Get all socialMedia types
 *     tags: [SocialMedia Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of socialMedia types
 */
socialMediaTypeApis.get("/", getAllSocialMediaType);

/**
 * @swagger
 * /v1/socialMedia-type/{id}:
 *   get:
 *     summary: Get socialMedia type by ID
 *     tags: [SocialMedia Types]
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
 *         description: SocialMedia type found
 *       404:
 *         description: Not found
 */
socialMediaTypeApis.get("/:id", getSocialMediaTypeById);

/**
 * @swagger
 * /v1/socialMedia-type/{id}:
 *   put:
 *     summary: Update socialMedia type
 *     tags: [SocialMedia Types]
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
 *         description: SocialMedia type updated
 *       404:
 *         description: Not found
 */
socialMediaTypeApis.patch("/:id", updatesocialMediaType);

/**
 * @swagger
 * /v1/socialMedia-type/{id}:
 *   delete:
 *     summary: Delete socialMedia type
 *     tags: [SocialMedia Types]
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
 *         description: SocialMedia type deleted
 *       404:
 *         description: Not found
 */
socialMediaTypeApis.delete("/:id", deletesocialMediaType);

export default socialMediaTypeApis;
