import express from "express";
import { createPermissions, deletePermission, getAllPermission, getByIdPermission, updatePermission } from "../controllers/permissionTypeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const permission = express.Router()

permission.use(authMiddleware)

permission.post("/", createPermissions)
permission.get("/", getAllPermission)
permission.get('/:id', getByIdPermission)
permission.patch('/:id', updatePermission)
permission.delete('/:id', deletePermission)

export default permission