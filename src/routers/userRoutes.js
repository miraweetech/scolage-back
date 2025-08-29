import express from "express";
import userApis from "../apis/userApis.js";

const userRoutes = express.Router();

userRoutes.use('/users', userApis)

export  default userRoutes;