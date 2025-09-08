import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createState, deleteState, getAllState, getStateById, updateState } from "../controllers/stateControllers.js";

const stateApis = express.Router()
stateApis.use(authMiddleware)

stateApis.post('/', createState)
stateApis.get('/', getAllState)
stateApis.get('/:id', getStateById)
stateApis.patch('/:id', updateState)
stateApis.delete('/:id', deleteState)

export default stateApis;