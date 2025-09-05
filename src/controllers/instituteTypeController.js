import { InstituteType, UserSuperMappings, SuperAdmin } from "../models/index.js";

export const createInstituteType = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("userId:", userId);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }

        const mapping = await UserSuperMappings.findOne({
            where: { user_id: userId, is_active: true, status: "active" }
        });

        if (!mapping) {
            return res.status(403).json({ error: "No SuperAdmin mapping found for this user" });
        }

        const superAdminId = mapping.super_admin_id;

        const data = await InstituteType.create({
            ...req.body,
            created_by: superAdminId
        });

        const result = await InstituteType.findByPk(data.institute_type_id, {
            // include: [
            //     {
            //         model: SuperAdmin,
            //         as: "creator",
            //         attributes: ["super_admin_id", "fname", "lname", "user_name"]
            //     }
            // ]
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

export const getAllInstituteTypes = async (req, res) => {
    try {
        const data = await InstituteType.findAll({
            // include: [
            //     { model: SuperAdmin, as: "creator", attributes: ["super_admin_id", "fname", "lname"] }
            // ]
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getInstituteTypeById = async (req, res) => {
    try {
        const data = await InstituteType.findByPk(req.params.id, {
            // include: [
            //     { model: SuperAdmin, as: "creator", attributes: ["super_admin_id", "fname", "lname"] }
            // ]
        });

        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const updateInstituteType = async (req, res) => {
    try {
        const data = await InstituteType.findByPk(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }

        await data.update(req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching institute type",
            error: error.message
        });
    }
};

export const deleteInstituteType = async (req, res) => {
    try {
        const data = await InstituteType.findByPk(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }

        await data.destroy();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting institute type",
            error: error.message
        });
    }
};
