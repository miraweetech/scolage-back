import { Modules, User, SuperModules, UserModuleMappings, InstituteModules, UserSuperMappings, UserInstituteMappings } from "../models/index.js";
import { sequelize } from "../configs/connection.js";

export const createModule = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const created_by = req.userId;
        const { status, module_name, path } = req.body;

        const user = await User.findByPk(created_by);
        if (!user) {
            await t.rollback();
            return res.status(404).json({ message: "User not found" });
        }

        let is_super = false;
        let is_institute = false;

        const superMapping = await UserSuperMappings.findOne({ where: { user_id: created_by } });
        if (superMapping) {
            is_super = true;
        }

        const instituteMapping = await UserInstituteMappings.findOne({ where: { user_id: created_by } });
        if (instituteMapping) {
            is_institute = true;
        }

        if (!is_super && !is_institute) {
            await t.rollback();
            return res.status(403).json({ message: "User is not authorized to create modules" });
        }

        if (is_super) {
            const exists = await SuperModules.findOne({ where: { path } });
            if (exists) {
                await t.rollback();
                return res.status(400).json({ message: "Super module path already exists" });
            }
        }

        if (is_institute) {
            const exists = await InstituteModules.findOne({ where: { path } });
            if (exists) {
                await t.rollback();
                return res.status(400).json({ message: "Institute module path already exists" });
            }
        }

        const createdModule = await Modules.create({
            created_by,
            is_super,
            is_institute,
            status
        }, { transaction: t });

        let createdChildModule = null;

        if (is_super) {
            createdChildModule = await SuperModules.create({
                module_name,
                path,
                module_id: createdModule.module_id
            }, { transaction: t });
        }

        if (is_institute) {
            createdChildModule = await InstituteModules.create({
                module_name,
                path,
                module_id: createdModule.module_id
            }, { transaction: t });
        }

        await t.commit();

        res.status(201).json({
            message: "Module created successfully",
            module: createdModule,
            childModule: createdChildModule
        });

    } catch (error) {
        await t.rollback();
        console.error("Error creating module:", error);
        res.status(400).json({
            error: error.message,
            details: error.errors || null
        });
    }
};

export const getAllModules = async (req, res) => {
    try {
        // Get page and limit from query params (default: page=1, limit=10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: modules, count } = await Modules.findAndCountAll({
            include: [
                {
                    model: User,
                    as: "creator",
                    attributes: ["id", "email", "mobile"]
                },
                { model: SuperModules, as: "superModules" },
                { model: InstituteModules, as: "instituteModules" }
            ],
            limit,
            offset,
            distinct: true
        });

        res.status(200).json({
            data: modules,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit

        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching modules",
            error: error.message
        });
    }
};

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

export const filterModules = async (req, res) => {
    try {
        const { type } = req.query; // "super" | "institute"
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        if (!type) {
            return res.status(400).json({ message: "Please provide type (super or institute)" });
        }

        if (type === "super") {
            const { rows, count } = await SuperModules.findAndCountAll({
                include: [
                    {
                        model: Modules,
                        as: "module",
                        include: [{ model: User, as: "creator", attributes: ["id", "email", "mobile"] }]
                    }
                ],
                limit,
                offset
            });
            return res.status(200).json({
                data: rows,
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                pageSize: limit
            });
        }

        if (type === "institute") {
            const { rows, count } = await InstituteModules.findAndCountAll({
                include: [
                    {
                        model: Modules,
                        as: "module",
                        include: [{ model: User, as: "creator", attributes: ["id", "email", "mobile"] }]
                    }
                ],
                limit,
                offset
            });
            return res.status(200).json({
                data: rows,
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                pageSize: limit
            });
        }

        return res.status(400).json({ message: "Invalid type. Use 'super' or 'institute'" });

    } catch (error) {
        res.status(500).json({
            message: "Error filtering modules",
            error: error.message
        });
    }
};

export const filterModulesByUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        if (!userId) {
            return res.status(400).json({ message: "Please provide userId" });
        }

        const { rows, count } = await Modules.findAndCountAll({
            where: { created_by: userId },
            include: [
                { model: SuperModules, as: "superModules" },
                { model: InstituteModules, as: "instituteModules" },
                { model: User, as: "creator", attributes: ["id", "email", "mobile"] }
            ],
            limit,
            offset
        });

        if (!rows.length) {
            return res.status(404).json({ message: "No modules found for this user" });
        }

        res.status(200).json({
            message: "Modules fetched successfully",
            data: rows,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        });
    } catch (error) {
        console.error("Error filtering modules by user:", error);
        res.status(500).json({
            message: "Error filtering modules by user",
            error: error.message
        });
    }
};
