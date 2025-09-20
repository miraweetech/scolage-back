import { ClassType } from "../models/index.js";

export const createClassType = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { created_by, ...classTypeData } = req.body;

        const newClassType = await ClassType.create({
            ...classTypeData,
            created_by: userId
        });

        return res.status(201).json({
            message: "Class type created",
            data: newClassType
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getAllClassTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await ClassType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Class types retrieved",
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit

        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const getClassTypeById = async (req, res) => {
    try {

        const classType = await ClassType.findByPk(req.params.id);

        if (!classType) {
            return res.status(404).json({
                message: "Class type not found"
            });
        }

        return res.status(200).json({
            message: "Class type retrieved",
            data: classType
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const updateClassType = async (req, res) => {
    try {
        const classType = await ClassType.findByPk(req.params.id);

        if (!classType) {
            return res.status(404).json({
                message: "Class type not found"
            });
        }

        await classType.update(req.body);
        return res.status(200).json({
            message: "Class type updated",
            data: classType
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const deleteClassType = async (req, res) => {
    try {
        const classType = await ClassType.findByPk(req.params.id);

        if (!classType) {
            return res.status(404).json({
                message: "Class type not found"
            });
        }

        await classType.destroy();
        return res.status(200).json({
            message: "Class type deleted"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
