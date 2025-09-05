import express from "express";
import { createInstituteType, deleteInstituteType, getAllInstituteTypes, getInstituteTypeById, updateInstituteType } from "../controllers/instituteTypeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const instituteTypeApis = express.Router();

instituteTypeApis.use(authMiddleware)

instituteTypeApis.post("/", createInstituteType);
instituteTypeApis.get("/", getAllInstituteTypes);
instituteTypeApis.get("/:id", getInstituteTypeById);
instituteTypeApis.patch("/:id", updateInstituteType);
instituteTypeApis.delete("/:id", deleteInstituteType);

export default instituteTypeApis;