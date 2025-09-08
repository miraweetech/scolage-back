import express, { Router } from "express";
import superAdminApis from "../apis/superAdminApis.js";
import moduleApis from "../apis/moduleApis.js";
import { uploadMiddleware } from "../middleware/uploadFileMW.js";
import { fileUploadController } from "../controllers/uploadFileControllers.js";
import instituteAdminApis from "../apis/instituteAdminApis.js";
import instituteApis from "../apis/instituteApis.js";
import instituteTypeApis from "../apis/instituteTypeApis.js";
import permission from "../apis/permissionTypeApis.js";
import subModuleApis from "../apis/subModuleApis.js";
import stateApis from "../apis/stateApis.js";
import cityApis from "../apis/cityApis.js";
import areaApis from "../apis/areaApis.js";

const routers = express.Router();

routers.use('/super-admin', superAdminApis)
routers.use('/module', moduleApis)
routers.use('/institute-admin', instituteAdminApis)
routers.use('/institute', instituteApis)
routers.use('/institute-type', instituteTypeApis)
routers.use('/permission', permission)
routers.use('/sub-module', subModuleApis)
routers.use('/state', stateApis)
routers.use('/city', cityApis)
routers.use('/area', areaApis)

routers.post("/upload", uploadMiddleware.single("file"), fileUploadController);

export default routers;

