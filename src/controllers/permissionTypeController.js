import { PermissionType, SuperAdmin, UserSuperMappings } from "../models/index.js";

export const createPermissions = async (req, res) => {
  try {
    const { title, can_edit } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const mapping = await UserSuperMappings.findOne({
      where: { user_id: userId },
      include: [
        {
          model: SuperAdmin,
          as: "superAdmin"
        }
      ]
    });

    if (!mapping || !mapping.superAdmin) {
      return res.status(404).json({ message: "SuperAdmin not found for this user" });
    }

    const superAdmin = mapping.superAdmin;

    

    if (!superAdmin.is_native) {
      return res.status(403).json({ message: "Only native SuperAdmins can create permissions" });
    }

    if (!["read", "write"].includes(title)) {
      return res.status(400).json({ message: "title must be 'read' or 'write'" });
    }

    const permission = await PermissionType.create({
      title,
      can_edit: can_edit ?? false,
      created_by: superAdmin.super_admin_id
    });

    return res.status(201).json({
      message: "PermissionType created successfully",
      data: permission
    });
  } catch (err) {
    console.error("Create Permission Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllPermission = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { rows: data, count } = await PermissionType.findAndCountAll({
          limit,
          offset
      });

      if (!data.length) {
          return res.status(404).json({ error: "No permissions found" });
      }

      return res.json({
          data,
          totalItems: count,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          pageSize: limit
      });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getByIdPermission = async (req, res) => {
    try {
        const data = await PermissionType.findByPk(req.params.id)
        if (!data) {
            res.status(404).json({ message: "Not found" })
        }

        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updatePermission = async (req, res) => {
    try {
        const data = await PermissionType.findByPk(req.params.id)

        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.update(req.body)
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deletePermission = async (req, res) => {
    try {
        const data = await PermissionType.findByPk(req.params.id)

        if (!data) {
            res.status(404).json({ message: "not found" })
        }
        await data.destroy()
        res.json({
            message: "Deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}