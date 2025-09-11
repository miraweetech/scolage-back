import { InstituteSystemType } from "../models/index.js";

export const createInstituteSystemType = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }
        const { created_by, ...instituteSystemTypeData } = req.body;

        const newInstituteSystemType = await InstituteSystemType.create({
            ...instituteSystemTypeData,
            created_by: userId
        })
        return res.status(200).json({
            message: "Institute System Type created",
            data: newInstituteSystemType
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllInstituteSystemType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: instituteSystemTypes, count } = await InstituteSystemType.findAndCountAll({
            limit,
            offset
        });

        if (!instituteSystemTypes.length) {
            return res.status(404).json({ error: "No Institute System Types found" });
        }

        return res.json({
            data: instituteSystemTypes,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getInstituteSystemTypeById = async (req, res) => {
    try {
        const data = await InstituteSystemType.findByPk(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: "Institute System Type not found"
            });
        }
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateInstituteSystemType = async (req, res) => {
    try {
        const data = await InstituteSystemType.findByPk(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Institute System Type not found" });
        }
        await data.update(req.body);
        return res.status(200).json({
            message: "Institute System Type updated",
            data
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteInstituteSystemType = async (req, res) => {
    try {
        const data = await InstituteSystemType.findByPk(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Institute System Type not found" });
        }
        await data.destroy();
        return res.status(200).json({ message: "Institute System Type deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
