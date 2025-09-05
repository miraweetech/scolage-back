import { Institute, InstituteType, SuperAdmin, UserSuperMappings } from "../models/index.js";

export const createInstitute = async (req, res) => {
    try {
        const userId = req.userId;

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

        const data = await Institute.create({
            ...req.body,
            InstituteTypeId: req.body.institute_type_id,
            created_by: superAdminId
        });

        return res.json({ message: "Institute created", data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

export const getAllInstitutes = async (req, res) => {
    try {
        const data = await Institute.findAll({
            include: [
                { model: InstituteType, as: "instituteType" },
                { model: SuperAdmin, as: "creator", attributes: ["super_admin_id", "fname", "lname"] }
            ]
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getInstituteById = async (req, res) => {
    try {
        const data = await Institute.findByPk(req.params.id, {
            include: [
                { model: InstituteType, as: "instituteType" },
                { model: SuperAdmin, as: "creator", attributes: ["super_admin_id", "fname", "lname"] }
            ]
        });
        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInstitute = async (req, res) => {
    try {
        const data = await Institute.findByPk(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }
        await data.update(req.body);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteInstitute = async (req, res) => {
    try {
        const data = await Institute.findByPk(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Not found" });
        }
        await data.destroy();
        res.json({
            message: "Deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
