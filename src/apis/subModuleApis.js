// src/apis/subModuleApis.js
import express from "express";
import {
  createSubModule,
  deleteSubModule,
  getAllSubModule,
  getByIdSubModule,
  updateSubModule,
} from "../controllers/subModuleController.js";
import { assignSubModulePermission } from "../controllers/moduleMappingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const subModuleApis = express.Router();

subModuleApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: SubModules
 *     description: Manage application sub-modules
 */

/**
 * @swagger
 * /v1/sub-module:
 *   post:
 *     summary: Create a new sub-module
 *     tags: [SubModules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               module_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Student Management
 *               description:
 *                 type: string
 *                 example: Handles student registration and records
 *     responses:
 *       201:
 *         description: Sub-module created successfully
 */
subModuleApis.post("/", createSubModule);

/**
 * @swagger
 * /v1/sub-module:
 *   get:
 *     summary: Get all sub-modules
 *     tags: [SubModules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sub-modules
 */
subModuleApis.get("/", getAllSubModule);

/**
 * @swagger
 * /v1/sub-module/{id}:
 *   get:
 *     summary: Get sub-module by ID
 *     tags: [SubModules]
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
 *         description: Sub-module details
 *       404:
 *         description: Sub-module not found
 */
subModuleApis.get("/:id", getByIdSubModule);

/**
 * @swagger
 * /v1/sub-module/{id}:
 *   patch:
 *     summary: Update sub-module by ID
 *     tags: [SubModules]
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
 *                 example: Attendance Tracking
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Sub-module updated successfully
 *       404:
 *         description: Sub-module not found
 */
subModuleApis.patch("/:id", updateSubModule);

/**
 * @swagger
 * /v1/sub-module/{id}:
 *   delete:
 *     summary: Delete sub-module by ID
 *     tags: [SubModules]
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
 *         description: Sub-module deleted successfully
 *       404:
 *         description: Sub-module not found
 */
subModuleApis.delete("/:id", deleteSubModule);

/**
 * @swagger
 * /v1/sub-module/assign-submodule:
 *   post:
 *     summary: Assign permissions to a sub-module
 *     tags: [SubModules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sub_module_id:
 *                 type: integer
 *                 example: 2
 *               role_id:
 *                 type: integer
 *                 example: 3
 *               permission_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Sub-module permission assigned successfully
 */
subModuleApis.post("/assign-submodule", assignSubModulePermission);

export default subModuleApis;
