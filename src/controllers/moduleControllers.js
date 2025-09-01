import Modules from "../models/Modules.js";
import User from "../models/User.js";

// Create Module
export const createModule = async (req, res) => {
    try {
        const module = await Modules.create(req.body);
        res.status(201).json(module);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Modules
export const getAllModules = async (req, res) => {
    try {
        const modules = await Modules.findAll({
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "email", "mobile"]
                }
            ]
        });
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: "Error fetching modules", error: error.message });
    }
};

// Get Module by ID
export const getModuleById = async (req, res) => {
    try {
        const module = await Modules.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "email", "mobile"]
                }
            ]
        });
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({ message: "Error fetching module", error: error.message });
    }
};

// Update Module
export const updateModule = async (req, res) => {
    try {
        const [updated] = await Modules.update(
            { ...req.body, modified_at: new Date() },
            { where: { module_id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ message: "Module not found" });
        }
        const updatedModule = await Modules.findByPk(req.params.id);
        res.status(200).json(updatedModule);
    } catch (error) {
        res.status(400).json({ message: "Error updating module", error: error.message });
    }
};

// Delete Module
export const deleteModule = async (req, res) => {
    try {
        const deleted = await Modules.destroy({ where: { module_id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting module", error: error.message });
    }
};