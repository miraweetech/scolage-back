import { DesignationType } from "../models/index.js";

export const createDesignationType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { created_by, ...designationTypeData } = req.body;
        const newDesignationType = await DesignationType.create({
            ...designationTypeData,
            created_by: userId
        })
        return res.status(201).json({
            message: "designation type created",
            data: newDesignationType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllDesignationType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await DesignationType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Designation type retrieved",
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit

        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getDesignationTypeById = async (req, res) => {
    try {
        const designationType = await DesignationType.findByPk(req.params.id);
        if (!designationType) {
            return res.status(404).json({
                message: "Designation type not found"
            });
        }
        return res.status(200).json({
            // message: "Email type retrieved",
            data: designationType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateDesignationType = async (req, res) => {
    try {
        const designationType = await DesignationType.findByPk(req.params.id);
        if (!designationType) {
            return res.status(404).json({
                message: "Designation type not found"
            });
        }
        await designationType.update(req.body);
        return res.status(200).json({
            message: "Designation type updated",
            data: designationType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteDesignationType = async (req, res) => {
    try {
        const designationType = await DesignationType.findByPk(req.params.id);
        if (!designationType) {
            return res.status(404).json({
                message: "designation type not found"
            });
        }
        await designationType.destroy();
        return res.status(200).json({
            message: "designation type deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};