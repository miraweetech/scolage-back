import { InstitutePhoneType } from "../models/index.js";

export const createPhoneType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { created_by, ...phoneTypeData } = req.body;
        const newPhoneType = await InstitutePhoneType.create({
            ...phoneTypeData,
            created_by: userId
        });
        return res.status(200).json({
            message: "Phone type created",
            data: newPhoneType
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllPhoneTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstitutePhoneType.findAndCountAll({
            limit,
            offset
        })

        return res.status(200).json({
            // message: "phone type retrieved",
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getPhoneTypeById = async (req, res) => {
    try {
        const phoneType = await InstitutePhoneType.findByPk(req.params.id);
        if (!phoneType) {
            return res.status(404).json({
                message: "phone type not found"
            });
        }
        return res.status(200).json({
            // message: "Email type retrieved",
            data: phoneType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updatePhoneType = async (req, res) => {
    try {
        const phoneType = await InstitutePhoneType.findByPk(req.params.id)
        if (!phoneType) {
            res.status(404).json({ message: "not found" })
        }

        await phoneType.update(req.body)
        res.status(200).json({
            message: "phone type updated",
            data: phoneType
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deletePhoneType = async (req, res) => {
    try {
        const phoneType = await InstitutePhoneType.findByPk(req.params.id)
        if (!phoneType) {
            res.status(404).json({ message: "not found" })
        }

        await phoneType.destroy()
        res.status(200).json({
            message: "phone type deleted"
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}