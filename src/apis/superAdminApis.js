import express from "express";
import { deleteSuperAdmin, getAllSuperAdmins, getSuperAdminById, registerSuperAdmin, sendOtpSuperAdmin, superAdminLogin, updateSuperAdmin } from "../controllers/superAdminControllers.js";
import { authMW } from "../middleware/authMW.js";

const superAdminApis = express.Router()

superAdminApis.post('/register', registerSuperAdmin)
superAdminApis.post("/send-otp", authMW, sendOtpSuperAdmin);
superAdminApis.post("/login", authMW, superAdminLogin);

superAdminApis.get('/all', getAllSuperAdmins)
superAdminApis.get('/:id', getSuperAdminById)
superAdminApis.patch('/:id', updateSuperAdmin)
superAdminApis.delete('/:id', deleteSuperAdmin)

export default superAdminApis;