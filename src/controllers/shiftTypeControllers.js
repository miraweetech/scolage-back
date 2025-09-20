import { InstituteShiftType } from "../models/index.js";

export const createShiftType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { created_by, ...shiftTypeData } = req.body;
        const newPhoneType = await InstituteShiftType.create({
            ...shiftTypeData,
            created_by: userId
        });
        return res.status(200).json({
            message: "shift type created",
            data: newPhoneType
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllShiftType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: data, count } = await InstituteShiftType.findAndCountAll({
            limit,
            offset
        })

        return res.status(200).json({
            // message: "shift type retrieved",
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

export const getShiftTypeById = async (req, res) => {
    try {
        const shiftType = await InstituteShiftType.findByPk(req.params.id);
        if (!shiftType) {
            return res.status(404).json({
                message: "shift type not found"
            });
        }
        return res.status(200).json({
            // message: "shift type retrieved",
            data: shiftType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateShiftType = async (req, res) => {
    try {
        const shiftType = await InstituteShiftType.findByPk(req.params.id)
        if (!shiftType) {
            res.status(404).json({ message: "not found" })
        }

        await shiftType.update(req.body)
        res.status(200).json({
            message: "shift type updated",
            data: shiftType
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteShiftType = async (req, res) => {
    try {
        const shiftType = await InstituteShiftType.findByPk(req.params.id)
        if (!shiftType) {
            res.status(404).json({ message: "not found" })
        }

        await shiftType.destroy()
        res.status(200).json({
            message: "shift type deleted"
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}