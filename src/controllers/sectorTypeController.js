import { SectorType } from "../models/index.js";

export const createSectorType = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { created_by, ...sectorTypeData } = req.body;
        const newSectorType = await SectorType.create({
            ...sectorTypeData,
            created_by: userId
        });
        return res.status(200).json({
            message: "Sector type created",
            data: newSectorType
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export const getAllSectorTypes = async (req, res) => {
    try {
        const sectorTypes = await SectorType.findAll();
        return res.status(200).json({
            // message: "Sector types retrieved",
            data: sectorTypes
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getSectorTypeById = async (req, res) => {
    try {
        const sectorType = await SectorType.findByPk(req.params.id);
        if (!sectorType) {
            return res.status(404).json({
                message: "Sector type not found"
            });
        }
        return res.status(200).json({
            // message: "Sector type retrieved",
            data: sectorType
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
export const updateSectorType = async (req, res) => {
    try {
        const sectorType = await SectorType.findByPk(req.params.id);
        if (!sectorType) {
            return res.status(404).json({
                message: "Sector type not found"
            });
        }
        await sectorType.update(req.body);

        return res.status(200).json({
            message: "Sector type updated",
            data: sectorType
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
export const deleteSectorType = async (req, res) => {
    try {
        const sectorType = await SectorType.findByPk(req.params.id);
        if (!sectorType) {
            return res.status(404).json({
                message: "Sector type not found"
            });
        }
        await sectorType.destroy();
        return res.status(200).json({
            message: "Sector type deleted"
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
