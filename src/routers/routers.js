import express from "express";
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
import instituteSystemType from "../apis/instituteSystemType.js";
import classTypeApis from "../apis/classTypeApis.js";
import sectorType from "../apis/sectorTyeApis.js";

const routers = express.Router();

/**
 * @swagger
 * tags:
 *   - name: File Upload
 *     description: API for uploading files
 */

routers.use("/super-admin", superAdminApis);
routers.use("/module", moduleApis);
routers.use("/institute-admin", instituteAdminApis);
routers.use("/institute", instituteApis);
routers.use("/institute-type", instituteTypeApis);
routers.use("/permission", permission);
routers.use("/sub-module", subModuleApis);
routers.use("/state", stateApis);
routers.use("/city", cityApis);
routers.use("/area", areaApis);
routers.use("/system-type", instituteSystemType);
routers.use("/class-type", classTypeApis);
routers.use("/sector-type", sectorType);

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a single file (image, pdf, etc.)
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 fileUrl:
 *                   type: string
 *                   example: http://localhost:7000/uploads/test.png
 */
routers.post("/upload", uploadMiddleware.single("file"), fileUploadController);

export default routers;
