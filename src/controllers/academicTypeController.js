import { InstituteAcademicType } from "../models/index.js"

export const createAcademicType = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { created_by, ...academicTypeData } = req.body
        const data = await InstituteAcademicType.create({
            ...academicTypeData,
            created_by: userId
        })
        return res.status(200).json({
            message: "academic type created",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAllAcademicType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstituteAcademicType.findAndCountAll({
            limit,
            offset
        })
        return res.status(200).json({
            message: "academic type retrieved",
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const getAcademicTypeById = async (req, res) => {
    try {
        const academicType = await InstituteAcademicType.findByPk(req.params.id)
        if (!academicType) {
            return res.status(404).json({
                message: "academic type not found"
            });
        }
        return res.status(200).json({
            message: "academic type retrieved",
            data: academicType
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateAcademicType = async (req, res) => {
    try {
        const data = await InstituteAcademicType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.update(req.body)
        return res.status(200).json({
            message: "academic type updated",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}

export const deleteAcademicType = async (req, res) => {
    try {
        const data = await InstituteAcademicType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.destroy()
        return res.status(200).json({
            message: "academic type deleted",
        })
    } catch (error) {
        res.status(500).json({
            error: message.error
        })
    }
}