import express, { Router } from "express";
import superAdminApis from "../apis/superAdminApis.js";
import moduleApis from "../apis/moduleApis.js";
import { uploadMiddleware } from "../middleware/uploadFileMW.js";
import { fileUploadController } from "../controllers/uploadFileControllers.js";
import instituteAdminApis from "../apis/instituteAdminApis.js";
import instituteApis from "../apis/instituteApis.js";
import instituteTypeApis from "../apis/instituteTypeApis.js";

const routers = express.Router();

routers.use('/super-admin', superAdminApis)
routers.use('/module', moduleApis)
routers.use('/institute-admin', instituteAdminApis)
routers.use('/institute', instituteApis)
routers.use('/institute-type', instituteTypeApis)

routers.post("/upload", uploadMiddleware.single("file"), fileUploadController);

export default routers;

