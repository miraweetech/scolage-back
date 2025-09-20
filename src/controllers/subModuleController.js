import { SubModules, SuperAdmin, Modules, UserSuperMappings } from "../models/index.js";

export const createSubModule = async (req, res) => {
  try {
    const { module_id, title, is_active, status } = req.body;

    if (!module_id || !title) {
      return res.status(400).json({ message: "module_id and title are required" });
    }

    const mapping = await UserSuperMappings.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: SuperAdmin,
          as: "superAdmin",
        }
      ]
    });

    if (!mapping || !mapping.superAdmin) {
      return res.status(404).json({ message: "SuperAdmin not found for this user" });
    }

    const module = await Modules.findByPk(module_id);
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const subModule = await SubModules.create({
      title,
      is_active: is_active ?? true,
      status: status ?? true,
      created_by: mapping.superAdmin.super_admin_id,
      module_id: module.module_id,
    });

    return res.status(201).json({
      message: "SubModule created successfully",
      data: subModule,
    });

  } catch (err) {
    console.error("Create SubModule Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllSubModule = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { module_id } = req.query;

    const filter = {};
    if (module_id) filter.module_id = module_id;

    const { rows: data, count } = await SubModules.findAndCountAll({
      where: filter,
      limit,
      offset
    });

    if (!data.length) {
      return res.status(404).json({ message: "No submodules found" });
    }

    return res.json({
      data,
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      pageSize: limit
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByIdSubModule = async (req, res) => {
  try {
    const data = await SubModules.findByPk(req.params.id)
    if (!data) {
      res.status(404).json({ message: "not found" })
    }
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateSubModule = async (req, res) => {
  try {
    const data = await SubModules.findByPk(req.params.id)
    if (!data) {
      res.status(500).json({ message: "not found" })
    }
    await data.update(req.body)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteSubModule = async (req, res) => {
  try {
    const data = await SubModules.findByPk(req.params.id)
    if (!data) {
      res.status(404).json({ message: 'not found' })
    }
    await data.destroy()
    res.json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

