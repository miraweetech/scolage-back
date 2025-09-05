import express from "express";
import { createModule, deleteModule, filterModules, getAllModules, getModuleById, updateModule } from "../controllers/moduleControllers.js";
import { assignModulePermission } from "../controllers/moduleMappingController.js";

const moduleApis = express.Router();

// moduleApis.use(authMiddleware)

moduleApis.post('/create', createModule)
moduleApis.get('/all', getAllModules)
moduleApis.get('/filter', filterModules); 
moduleApis.get('/:id', getModuleById)
moduleApis.patch('/:id', updateModule)
moduleApis.delete('/:id', deleteModule)


moduleApis.post('/assign-module', assignModulePermission)

export default moduleApis;