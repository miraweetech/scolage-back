import { InstituteInfrastructureType } from "../models/index.js";

export const createInfrastructureType = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { created_by, ...infrastructureTypeData } = req.body;
        const newInfrastructureType = {
            ...infrastructureTypeData,
            created_by: userId
        };

        const createdInfrastructureType = await InstituteInfrastructureType.create(newInfrastructureType);
        return res.status(201).json({
            message: "Infrastructure type created",
            data: createdInfrastructureType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllInfrastructureTypes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await InstituteInfrastructureType.findAndCountAll({
            limit,
            offset
        });
        return res.status(200).json({
            message: "Infrastructure types retrieved",
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

export const getInfrastructureTypeById = async (req, res) => {
    try {
        const infrastructureType = await InstituteInfrastructureType.findByPk(req.params.id);
        if (!infrastructureType) {
            return res.status(404).json({
                message: "Infrastructure type not found"
            });
        }
        return res.status(200).json({
            // message: "Infrastructure type retrieved",
            data: infrastructureType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInfrastructureType = async (req, res) => {
    try {
        const infrastructureType = await InstituteInfrastructureType.findByPk(req.params.id);
        if (!infrastructureType) {
            return res.status(404).json({
                message: "Infrastructure type not found"
            });
        }
        await infrastructureType.update(req.body);
        return res.status(200).json({
            message: "Infrastructure type updated",
            data: infrastructureType
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteInfrastructureType = async (req, res) => {
    try {
        const infrastructureType = await InstituteInfrastructureType.findByPk(req.params.id);
        if (!infrastructureType) {
            return res.status(404).json({
                message: "Infrastructure type not found"
            });
        }
        await infrastructureType.destroy();
        return res.status(200).json({
            message: "Infrastructure type deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};