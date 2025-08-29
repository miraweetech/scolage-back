import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";

const userApis = express.Router()

userApis.post('/create', createUser)
userApis.get('/all', getAllUsers)
userApis.get('/:id', getUserById)
userApis.patch('/:id', updateUser)
userApis.delete('/:id', deleteUser)

export default userApis;