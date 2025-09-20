import { SubjectType } from "../models/index.js";

export const createSubjectType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { created_by, ...subjectTypeData } = req.body;
        const newSubjectType = await SubjectType.create({
            ...subjectTypeData,
            created_by: userId
        })
        return res.status(201).json({
            message: "subject type created",
            data: newSubjectType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllSubjectType = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await SubjectType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Subject type retrieved",
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

export const getSubjectTypeById = async (req, res) => {
    try {
        const subjectType = await SubjectType.findByPk(req.params.id);
        if (!subjectType) {
            return res.status(404).json({
                message: "subject type not found"
            });
        }
        return res.status(200).json({
            // message: "Email type retrieved",
            data: subjectType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSubjectType = async (req, res) => {
    try {
        const subjectType = await SubjectType.findByPk(req.params.id);
        if (!subjectType) {
            return res.status(404).json({
                message: "Subject type not found"
            });
        }
        await subjectType.update(req.body);
        return res.status(200).json({
            message: "Subject type updated",
            data: subjectType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSubjectType = async (req, res) => {
    try {
        const subjectType = await SubjectType.findByPk(req.params.id);
        if (!subjectType) {
            return res.status(404).json({
                message: "subject type not found"
            });
        }
        await subjectType.destroy();
        return res.status(200).json({
            message: "subject type deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};