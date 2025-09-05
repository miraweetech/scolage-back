import { Op } from "sequelize";
import { Modules, User, SuperModules, UserModuleMappings, InstituteModules } from "../models/index.js";

// Create Module
export const createModule = async (req, res) => {
    try {
        const { created_by, is_super, is_institute, status, module_name, path } = req.body;

        const user = await User.findByPk(created_by);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (is_super) {
            const exists = await SuperModules.findOne({
                where: {
                    [Op.or]: [{ path }]
                }
            });
            if (exists) {
                return res.status(400).json({ message: "Super module path already exists" });
            }
        }

        if (is_institute) {
            const exists = await InstituteModules.findOne({
                where: {
                    [Op.or]: [{ path }]
                }
            });
            if (exists) {
                return res.status(400).json({ message: "Institute module path already exists" });
            }
        }

        const createdModule = await Modules.create({
            created_by,
            is_super,
            is_institute,
            status
        });

        let createdChildModule = null;

        if (is_super) {
            createdChildModule = await SuperModules.create({
                module_name,
                path,
                module_id: createdModule.module_id
            });
        }

        if (is_institute) {
            createdChildModule = await InstituteModules.create({
                module_name,
                path,
                module_id: createdModule.module_id
            });
        }

        res.status(201).json({
            message: "Module created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error.message,
            details: error.errors
        });
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
                },
                { model: SuperModules, as: "superModules" },
                {model: InstituteModules, as: "instituteModules" }
            ]
        });
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching modules",
            error: error.message
        });
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
                },
                // { model: SuperModules, as: "superModules" },
            ]
        });
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.status(200).json(module);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching module",
            error: error.message
        });
    }
};

// Update Module
export const updateModule = async (req, res) => {
    try {
        const moduleId = req.params.id;
        const { module_name, path, ...rest } = req.body;

        const [updated] = await Modules.update(
            { ...rest, modified_at: new Date() },
            { where: { module_id: moduleId } }
        );

        if (!updated) {
            return res.status(404).json({ message: "Module not found" });
        }

        if (module_name || path) {
            await SuperModules.update(
                { ...(module_name && { module_name }), ...(path && { path }) },
                { where: { module_id: moduleId } }
            );

            await InstituteModules.update(
                { ...(module_name && { module_name }), ...(path && { path }) },
                { where: { module_id: moduleId } }
            );
        }

        const updatedModule = await Modules.findByPk(moduleId, {
            include: [
                { model: SuperModules, as: "superModules" },
                { model: InstituteModules, as: "instituteModules" },
            ]
        });

        res.status(200).json({
            message: "Module updated successfully",
            data: updatedModule
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating module",
            error: error.message
        });
    }
};

// Delete Module
export const deleteModule = async (req, res) => {
    try {
        const moduleId = req.params.id;

        await SuperModules.destroy({ where: { module_id: moduleId } });

        await InstituteModules.destroy({ where: { module_id: moduleId } });

        const deleted = await Modules.destroy({ where: { module_id: moduleId } });

        if (!deleted) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting module",
            error: error.message
        });
    }
};

// Filter Modules by type (super/institute)
export const filterModules = async (req, res) => {
    try {
        const { type } = req.query; // "super" | "institute"

        if (!type) {
            return res.status(400).json({ message: "Please provide type (super or institute)" });
        }

        if (type === "super") {
            const superModules = await SuperModules.findAll({
                include: [
                    {
                        model: Modules,
                        as: "module",
                        include: [{ model: User, as: "creator", attributes: ["id", "email", "mobile"] }]
                    }
                ]
            });
            return res.status(200).json(superModules);
        }

        if (type === "institute") {
            const instituteModules = await InstituteModules.findAll({
                include: [
                    {
                        model: Modules,
                        as: "module",
                        include: [{ model: User, as: "creator", attributes: ["id", "email", "mobile"] }]
                    }
                ]
            });
            return res.status(200).json(instituteModules);
        }

        return res.status(400).json({ message: "Invalid type. Use 'super' or 'institute'" });

    } catch (error) {
        res.status(500).json({
            message: "Error filtering modules",
            error: error.message
        });
    }
};
