import express from "express";
import { createInstitute, deleteInstitute, getAllInstitutes, getInstituteById, updateInstitute } from "../controllers/instituteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const instituteApis = express.Router();

instituteApis.use(authMiddleware)

instituteApis.post("/", createInstitute);
instituteApis.get("/", getAllInstitutes);
instituteApis.get("/:id", getInstituteById);
instituteApis.put("/:id", updateInstitute);
instituteApis.delete("/:id", deleteInstitute);

export default instituteApis;