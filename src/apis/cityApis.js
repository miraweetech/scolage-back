import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createCity, deleteCity, getAllCity, getCityById, updateCity } from "../controllers/cityControllers.js";

const cityApis = express.Router();
cityApis.use(authMiddleware);

cityApis.post('/', createCity)
cityApis.get('/', getAllCity)
cityApis.get('/:id', getCityById)
cityApis.patch('/:id', updateCity)
cityApis.delete('/:id', deleteCity)

export default cityApis;