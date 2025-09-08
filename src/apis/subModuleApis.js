import express from "express";
import { createSubModule, deleteSubModule, getAllSubModule, getByIdSubModule, updateSubModule } from "../controllers/subModuleController.js";
import { assignSubModulePermission } from "../controllers/moduleMappingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const subModuleApis = express.Router()

subModuleApis.use(authMiddleware)

subModuleApis.post('/', createSubModule)
subModuleApis.get('/', getAllSubModule)
subModuleApis.get('/:id', getByIdSubModule)
subModuleApis.patch('/:id', updateSubModule)
subModuleApis.delete('/:id', deleteSubModule)

subModuleApis.post('/assign-submodule', assignSubModulePermission)

export default subModuleApis