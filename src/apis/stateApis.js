import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createState,
  deleteState,
  getAllState,
  getStateById,
  updateState,
} from "../controllers/stateControllers.js";

const stateApis = express.Router();
stateApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: States
 *     description: State management APIs
 */

/**
 * @swagger
 * /v1/state:
 *   post:
 *     summary: Create a new state
 *     tags: [States]
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
 *                 example: Gujarat
 *     responses:
 *       201:
 *         description: State created successfully
 */
stateApis.post("/", createState);

/**
 * @swagger
 * /v1/state:
 *   get:
 *     summary: Get all states
 *     tags: [States]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of states
 */
stateApis.get("/", getAllState);

/**
 * @swagger
 * /v1/state/{id}:
 *   get:
 *     summary: Get state by ID
 *     tags: [States]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: State details
 *       404:
 *         description: State not found
 */
stateApis.get("/:id", getStateById);

/**
 * @swagger
 * /v1/state/{id}:
 *   put:
 *     summary: Update state by ID
 *     tags: [States]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maharashtra
 *     responses:
 *       200:
 *         description: State updated successfully
 *       404:
 *         description: State not found
 */
stateApis.put("/:id", updateState);

/**
 * @swagger
 * /v1/state/{id}:
 *   delete:
 *     summary: Delete state by ID
 *     tags: [States]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: State deleted successfully
 *       404:
 *         description: State not found
 */
stateApis.delete("/:id", deleteState);

export default stateApis;
