import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createAffiliateType, deleteAffiliateType, getAffiliateTypeById, getAllAffiliateType, updateAffiliateType } from "../controllers/affiliateTypeControllers.js";

const affiliateTypeApis = express.Router();

affiliateTypeApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Affiliate Types
 *     description: Manage affiliate types
 */

/**
 * @swagger
 * /v1/affiliate-type:
 *   post:
 *     summary: Create a new affiliate type
 *     tags: [Affiliate Types]
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
 *         description: Affiliate type created
 */
affiliateTypeApis.post("/", createAffiliateType);

/**
 * @swagger
 * /v1/affiliate-type:
 *   get:
 *     summary: Get all affiliate types
 *     tags: [Affiliate Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of affiliate types
 */
affiliateTypeApis.get("/", getAllAffiliateType);

/**
 * @swagger
 * /v1/affiliate-type/{id}:
 *   get:
 *     summary: Get affiliate type by ID
 *     tags: [Affiliate Types]
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
 *         description: Affiliate type found
 *       404:
 *         description: Not found
 */
affiliateTypeApis.get("/:id", getAffiliateTypeById);

/**
 * @swagger
 * /v1/affiliate-type/{id}:
 *   put:
 *     summary: Update affiliate type
 *     tags: [Affiliate Types]
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
 *         description: Affiliate type updated
 *       404:
 *         description: Not found
 */
affiliateTypeApis.patch("/:id", updateAffiliateType);

/**
 * @swagger
 * /v1/affiliate-type/{id}:
 *   delete:
 *     summary: Delete affiliate type
 *     tags: [Affiliate Types]
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
 *         description: Affiliate type deleted
 *       404:
 *         description: Not found
 */
affiliateTypeApis.delete("/:id", deleteAffiliateType);

export default affiliateTypeApis;
