import Modules from "./Modules.js";
import UserInstituteMappings from "./UserInstituteMappings.js";
import UserSuperMappings from "./UserSuperMappings.js";
import UserModuleMappings from "./UserModuleMappings.js";
import SubModulesPermissionsMapping from "./SubModulesPermissionsMapping.js";
import InstituteType from "./InstituteType.js";
import SuperAdmin from "./SuperAdmin.js";
import SubModulesPermissions from "./SubModulesPermissions.js";
import Institute from "./Institute.js";
import InstituteModules from "./InstituteModules.js";
import SuperModules from "./SuperModules.js";
import InstituteAdmin from "./InstituteAdmin.js";
import PermissionType from "./PermissionType.js";
import User from "./User.js";

// Modules.created_by → User.id
Modules.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(Modules, { foreignKey: "created_by", as: "modules" });

// UserInstituteMappings.user_id → User.id
UserInstituteMappings.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(UserInstituteMappings, { foreignKey: "user_id", as: "userInstituteMappings" });

// SuperAdmin.created_by → User.id
SuperAdmin.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(SuperAdmin, { foreignKey: "created_by", as: "createdSuperAdmins" });

//UserModuleMappings.user.id -> User.id
UserModuleMappings.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(UserModuleMappings, { foreignKey: "user_id", as: "userModuleMappings" });

//SubModulePermissionMapping.user_id -> User.id
SubModulesPermissionsMapping.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(SubModulesPermissionsMapping, { foreignKey: "user_id", as: "SubModulesPermissionsMapping" });

// UserSuperMappings.user_id → User.id
UserSuperMappings.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(UserSuperMappings, { foreignKey: "user_id", as: "userSuperMappings" });

// UserSuperMappings.super_admin_id → SuperAdmin.super_admin_id
UserSuperMappings.belongsTo(SuperAdmin, { foreignKey: "super_admin_id", as: "superAdmin" });
SuperAdmin.hasMany(UserSuperMappings, { foreignKey: "super_admin_id", as: "userSuperMappings" });

// SubModulesPermissions.created_by → SuperAdmin.super_admin_id
SubModulesPermissions.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(SubModulesPermissions, { foreignKey: "created_by", as: "subModulesPermissions" });

// Institute.created_by → SuperAdmin.super_admin_id
Institute.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(Institute, { foreignKey: "created_by", as: "institutes" });

// InstituteType.created_by → SuperAdmin.super_admin_id
InstituteType.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(InstituteType, { foreignKey: "created_by", as: "instituteTypes" });

//InstituteModules.module_id -> Modules.module_id
InstituteModules.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(InstituteModules, { foreignKey: "module_id", as: "instituteModules" });

//subModulePermissions.module_id -> Modules.module_id
SubModulesPermissions.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(SubModulesPermissions, { foreignKey: "module_id", as: "subModulesPermissions" });

//SuperModules.module_id -> Modules.module_id
SuperModules.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(SuperModules, { foreignKey: "module_id", as: "superModules" });

//UserModuleMappings.module_id -> Modules.module_id
UserModuleMappings.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(UserModuleMappings, { foreignKey: "module_id", as: "userModuleMappings" });

//SubModulesPermissionsMapping.module_id -> Modules.module_id
SubModulesPermissionsMapping.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(SubModulesPermissionsMapping, { foreignKey: "module_id", as: "subModulesPermissionsMappings" });

//Institute.institute_type_id -> InstituteType.institute_type_id
Institute.belongsTo(InstituteType, { foreignKey: "institute_type_id", as: "instituteType" });
InstituteType.hasMany(Institute, { foreignKey: "institute_type_id", as: "institutes" });

//UserInstituteMappings.institute_admin_id -> InstituteAdmins.institute_admin_id
UserInstituteMappings.belongsTo(InstituteAdmin, { foreignKey: "institute_admin_id", as: "instituteAdmin" });
InstituteAdmin.hasMany(UserInstituteMappings, { foreignKey: "institute_admin_id", as: "userInstituteMappings" });

//userInstituteMappings.institute_id -> Institutes.id
UserInstituteMappings.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(UserInstituteMappings, { foreignKey: "institute_id", as: "userInstituteMappings" });

//SubModulesPermissionsMapping.sub_module_permission_id -> SubModulesPermissions.sub_module_permission_id
SubModulesPermissionsMapping.belongsTo(SubModulesPermissions, { foreignKey: "sub_module_permissions_id", as: "subModulePermission" });
SubModulesPermissions.hasMany(SubModulesPermissionsMapping, { foreignKey: "sub_module_permissions_id", as: "subModulesPermissionsMappings" });

//subModulesPermissionsMapping.permission_type_id -> PermissionType.permission_type_id
SubModulesPermissionsMapping.belongsTo(PermissionType, { foreignKey: "permission_type_id", as: "permissionType" });
PermissionType.hasMany(SubModulesPermissionsMapping, { foreignKey: "permission_type_id", as: "subModulesPermissionsMappings" });

// Export all models if needed
export {
    User,
    Modules,
    UserInstituteMappings,
    UserSuperMappings,
    UserModuleMappings,
    SubModulesPermissionsMapping,
    InstituteType,
    SuperAdmin,
    SubModulesPermissions,
    Institute,
    InstituteModules,
    SuperModules,
    InstituteAdmin,
    PermissionType
};