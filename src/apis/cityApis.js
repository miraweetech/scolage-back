import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createCity,
  deleteCity,
  getAllCity,
  getCityById,
  updateCity,
} from "../controllers/cityControllers.js";

const cityApis = express.Router();
cityApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Cities
 *     description: City management APIs
 */

/**
 * @swagger
 * /v1/city:
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
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
 *                 example: Ahmedabad
 *               state_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: City created successfully
 */
cityApis.post("/", createCity);

/**
 * @swagger
 * /v1/city:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cities
 */
cityApis.get("/", getAllCity);

/**
 * @swagger
 * /v1/city/{id}:
 *   get:
 *     summary: Get city by ID
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: City details
 *       404:
 *         description: City not found
 */
cityApis.get("/:id", getCityById);

/**
 * @swagger
 * /v1/city/{id}:
 *   patch:
 *     summary: Update city by ID
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Surat
 *               state_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: City updated successfully
 *       404:
 *         description: City not found
 */
cityApis.patch("/:id", updateCity);

/**
 * @swagger
 * /v1/city/{id}:
 *   delete:
 *     summary: Delete city by ID
 *     tags: [Cities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: City deleted successfully
 *       404:
 *         description: City not found
 */
cityApis.delete("/:id", deleteCity);

export default cityApis;
