// src/apis/permissionTypeApis.js
import express from "express";
import {
  createPermissions,
  deletePermission,
  getAllPermission,
  getByIdPermission,
  updatePermission,
} from "../controllers/permissionTypeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const permission = express.Router();

permission.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Permissions
 *     description: Manage user permission types
 */

/**
 * @swagger
 * /v1/permission:
 *   post:
 *     summary: Create a new permission type
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 enum: [read, write]
 *                 example: read
 *               can_edit:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Permission type created successfully
 */
permission.post("/", createPermissions);

/**
 * @swagger
 * /v1/permission:
 *   get:
 *     summary: Get all permission types
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all permissions
 */
permission.get("/", getAllPermission);

/**
 * @swagger
 * /v1/permission/{id}:
 *   get:
 *     summary: Get permission type by ID
 *     tags: [Permissions]
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
 *         description: Permission details
 *       404:
 *         description: Permission not found
 */
permission.get("/:id", getByIdPermission);

/**
 * @swagger
 * /v1/permission/{id}:
 *   patch:
 *     summary: Update a permission type by ID
 *     tags: [Permissions]
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
 *               title:
 *                 type: string
 *                 enum: [read, write]
 *                 example: write
 *               can_edit:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       404:
 *         description: Permission not found
 */
permission.patch("/:id", updatePermission);

/**
 * @swagger
 * /v1/permission/{id}:
 *   delete:
 *     summary: Delete a permission type by ID
 *     tags: [Permissions]
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
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 */
permission.delete("/:id", deletePermission);

export default permission;
