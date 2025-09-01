import express from "express";
import { createModule, deleteModule, getAllModules, getModuleById, updateModule } from "../controllers/moduleControllers.js";

const moduleApis = express.Router();

moduleApis.post('/create', createModule)
moduleApis.get('/all', getAllModules)
moduleApis.get('/:id', getModuleById)
moduleApis.patch('/:id', updateModule)
moduleApis.delete('/:id', deleteModule)

export default moduleApis;