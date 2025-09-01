import express from "express";
import { getAllSuperAdmins, registerSuperAdmin, sendOtpSuperAdmin, superAdminLogin } from "../controllers/superAdminControllers.js";
import { authValidationMW } from "../middleware/authValidationMW.js";

const superAdminApis = express.Router()

superAdminApis.post('/register', registerSuperAdmin)
superAdminApis.post("/send-otp", authValidationMW, sendOtpSuperAdmin);
superAdminApis.post("/login", authValidationMW, superAdminLogin);

superAdminApis.get('/all', getAllSuperAdmins)

export default superAdminApis;