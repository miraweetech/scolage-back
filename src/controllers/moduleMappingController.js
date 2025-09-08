import { UserModuleMappings, Modules, SuperModules, InstituteModules, UserSuperMappings, UserInstituteMappings, SubModules, SubModulesPermissionsMapping, PermissionType } from "../models/index.js";

// Create permission mapping
export const assignModulePermission = async (req, res) => {
  try {
    const { user_id, module_id } = req.body;

    // Check if module exists
    const module = await Modules.findByPk(module_id, {
      include: [
        { model: SuperModules, as: "superModules" },
        { model: InstituteModules, as: "instituteModules" }
      ]
    });

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Resolve user role
    const isSuperAdmin = await UserSuperMappings.findOne({ where: { user_id } });
    const isInstituteAdmin = await UserInstituteMappings.findOne({ where: { user_id } });

    if (!isSuperAdmin && !isInstituteAdmin) {
      return res.status(404).json({ message: "User not found in SuperAdmin or InstituteAdmin mappings" });
    }

    // Module type
    const isSuperModule = module.superModules && module.superModules.length > 0;
    const isInstituteModule = module.instituteModules && module.instituteModules.length > 0;

    //  SuperModule
    if (isSuperModule) {
      if (!isSuperAdmin) {
        return res.status(400).json({ message: "Only SuperAdmins can be assigned SuperModules" });
      }
    }

    // InstituteModule
    if (isInstituteModule) {
      if (!isInstituteAdmin) {
        return res.status(400).json({ message: "Only InstituteAdmins can be assigned InstituteModules" });
      }
    }

    // Prevent duplicate
    const existingMapping = await UserModuleMappings.findOne({
      where: { user_id, module_id, is_deleted: false }
    });

    if (existingMapping) {
      return res.status(400).json({ message: "Modules already assigned" });
    }

    // Create mapping
    const mapping = await UserModuleMappings.create({ user_id, module_id });

    return res.status(201).json({
      message: "Module permission assigned successfully",
      data: mapping
    });

  } catch (error) {
    console.error("Error in assignModulePermission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const assignSubModulePermission = async (req, res) => {
  try {
    const { user_id, module_id, sub_module_id, permission_type_id } = req.body;

    const userModule = await UserModuleMappings.findOne({
      where: { user_id, module_id, is_deleted: false }
    });

    if (!userModule) {
      return res.status(400).json({ message: "User does not have access to this module" });
    }

    const subModule = await SubModules.findOne({
      where: { sub_module_id, module_id }
    });

    if (!subModule) {
      return res.status(404).json({ message: "SubModule not found for this module" });
    }

    const permissionType = await PermissionType.findByPk(permission_type_id);

    if (!permissionType) {
      return res.status(404).json({ message: "Permission type not found" });
    }

    const existingMapping = await SubModulesPermissionsMapping.findOne({
      where: { user_id, module_id, sub_module_id, permission_type_id }
    });

    if (existingMapping) {
      return res.status(400).json({ message: "Permission already assigned for this submodule" });
    }

    const newMapping = await SubModulesPermissionsMapping.create({
      user_id,
      module_id,
      sub_module_id,
      permission_type_id
    });

    res.status(201).json({
      message: "SubModule permission assigned successfully",
      data: newMapping
    });

  } catch (error) {
    console.error("Error in assignSubModulePermission:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
