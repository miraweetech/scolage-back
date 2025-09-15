import { QualificationType } from "../models/index.js";

export const createQualificationType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { created_by, ...qualificationTypeData } = req.body;
        const newQualificationType = await QualificationType.create({
            ...qualificationTypeData,
            created_by: userId
        })
        return res.status(201).json({
            message: "qualificationType type created",
            data: newQualificationType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllQualificationType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await QualificationType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Qualification type retrieved",
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


export const getQualificationTypeById = async (req, res) => {
    try {
        const qualificationType = await QualificationType.findByPk(req.params.id);
        if (!qualificationType) {
            return res.status(404).json({
                message: "Qualification type not found"
            });
        }
        return res.status(200).json({
            // message: "Email type retrieved",
            data: qualificationType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateQualificationType = async (req, res) => {
    try {
        const qualificationType = await QualificationType.findByPk(req.params.id);
        if (!qualificationType) {
            return res.status(404).json({
                message: "Qualification type not found"
            });
        }
        await qualificationType.update(req.body);
        return res.status(200).json({
            message: "Qualification type updated",
            data: qualificationType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteQualificationType = async (req, res) => {
    try {
        const qualificationType = await QualificationType.findByPk(req.params.id);
        if (!qualificationType) {
            return res.status(404).json({
                message: "Qualification type not found"
            });
        }
        await qualificationType.destroy();
        return res.status(200).json({
            message: "Qualification type deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};