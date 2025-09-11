import { InstituteEmailType } from "../models/index.js";

export const createEmailType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { created_by, ...emailTypeData } = req.body;
        const newEmailType = await InstituteEmailType.create({
            ...emailTypeData,
            created_by: userId
        })
        return res.status(201).json({
            message: "Email type created",
            data: newEmailType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllEmailTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const {rows: data, count} = await InstituteEmailType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Email types retrieved",
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


export const getEmailTypeById = async (req, res) => {
    try {
        const emailType = await InstituteEmailType.findByPk(req.params.id);
        if (!emailType) {
            return res.status(404).json({
                message: "Email type not found"
            });
        }
        return res.status(200).json({
            // message: "Email type retrieved",
            data: emailType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEmailType = async (req, res) => {
    try {
        const emailType = await InstituteEmailType.findByPk(req.params.id);
        if (!emailType) {
            return res.status(404).json({
                message: "Email type not found"
            });
        }
        await emailType.update(req.body);
        return res.status(200).json({
            message: "Email type updated",
            data: emailType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteEmailType = async (req, res) => {
    try {
        const emailType = await InstituteEmailType.findByPk(req.params.id);
        if (!emailType) {
            return res.status(404).json({
                message: "Email type not found"
            });
        }
        await emailType.destroy();
        return res.status(200).json({
            message: "Email type deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};