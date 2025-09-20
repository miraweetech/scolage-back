import express from "express";
import {
  createModule,
  deleteModule,
  filterModules,
  filterModulesByUser,
  getAllModules,
  getModuleById,
  updateModule,
} from "../controllers/moduleControllers.js";
import { assignModulePermission } from "../controllers/moduleMappingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const moduleApis = express.Router();

moduleApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Modules
 *     description: Manage application modules and permissions
 */

/**
 * @swagger
 * /v1/module/create:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
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
 *                 example: Dashboard
 *               description:
 *                 type: string
 *                 example: This module handles the dashboard
 *     responses:
 *       201:
 *         description: Module created successfully
 */
moduleApis.post("/create", createModule);

/**
 * @swagger
 * /v1/module/all:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all modules
 */
moduleApis.get("/all", getAllModules);

/**
 * @swagger
 * /v1/module/filter:
 *   get:
 *     summary: Filter modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter modules by name
 *     responses:
 *       200:
 *         description: Filtered list of modules
 */
moduleApis.get("/filter", filterModules);

/**
 * @swagger
 * /v1/module/filter:
 *   get:
 *     summary: Filter modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter modules by name
 *     responses:
 *       200:
 *         description: Filtered list of modules
 */
moduleApis.get("/", filterModulesByUser);

/**
 * @swagger
 * /v1/module/{id}:
 *   get:
 *     summary: Get module by ID
 *     tags: [Modules]
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
 *         description: Module details
 *       404:
 *         description: Module not found
 */
moduleApis.get("/:id", getModuleById);

/**
 * @swagger
 * /v1/module/{id}:
 *   patch:
 *     summary: Update a module by ID
 *     tags: [Modules]
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
 *                 example: Reports
 *               description:
 *                 type: string
 *                 example: Updated description for Reports
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       404:
 *         description: Module not found
 */
moduleApis.patch("/:id", updateModule);

/**
 * @swagger
 * /v1/module/{id}:
 *   delete:
 *     summary: Delete a module by ID
 *     tags: [Modules]
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
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 */
moduleApis.delete("/:id", deleteModule);

/**
 * @swagger
 * /v1/module/assign-module:
 *   post:
 *     summary: Assign permissions to a module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleId:
 *                 type: integer
 *                 example: 1
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: Permissions assigned successfully
 */
moduleApis.post("/assign-module", assignModulePermission);

export default moduleApis;
