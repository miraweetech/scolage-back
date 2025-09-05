import express from "express";
import { createInstituteAdmin, getAllInstituteAdmins, InstituteAdminLogin, sendOtpInstituteAdmin } from "../controllers/instituteAdminControllers.js";
import { instituteAuthValidationMW } from "../middleware/instituteAuthValidationMW.js";

const instituteAdminApis = express.Router();

instituteAdminApis.post('/register', createInstituteAdmin)
instituteAdminApis.post('/send-otp', instituteAuthValidationMW, sendOtpInstituteAdmin)
instituteAdminApis.post('/login', instituteAuthValidationMW, InstituteAdminLogin)

instituteAdminApis.get('/all', getAllInstituteAdmins)

export default instituteAdminApis;