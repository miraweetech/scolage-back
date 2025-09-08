import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createArea, deleteArea, getAllArea, getAreaById, updateArea } from "../controllers/areaControllers.js";

const areaApis = express.Router();
areaApis.use(authMiddleware)

areaApis.post('/', createArea)
areaApis.get('/', getAllArea)
areaApis.get('/:id', getAreaById)
areaApis.patch('/:id', updateArea)
areaApis.delete('/:id', deleteArea)

export default areaApis;