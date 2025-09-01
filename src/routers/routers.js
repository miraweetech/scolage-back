import express, { Router } from "express";
import superAdminApis from "../apis/superAdminApis.js";
import moduleApis from "../apis/moduleApis.js";
import { uploadMiddleware } from "../middleware/uploadFileMW.js";
import { fileUploadController } from "../controllers/uploadFileControllers.js";


const routers = express.Router();

routers.use('/super-admin', superAdminApis)
routers.use('/module', moduleApis)

routers.post("/upload", uploadMiddleware.single("file"), fileUploadController);

export default routers;