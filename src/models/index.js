import Modules from "./Modules.js";
import UserInstituteMappings from "./UserInstituteMappings.js";
import UserSuperMappings from "./UserSuperMappings.js";
import UserModuleMappings from "./UserModuleMappings.js";
import SubModulesPermissionsMapping from "./SubModulesPermissionsMapping.js";
import InstituteType from "./InstituteType.js";
import SuperAdmin from "./SuperAdmin.js";
import Institute from "./Institute.js";
import InstituteModules from "./InstituteModules.js";
import SuperModules from "./SuperModules.js";
import InstituteAdmin from "./InstituteAdmin.js";
import PermissionType from "./PermissionType.js";
import User from "./User.js";
import SubModules from "./SubModules.js";
import StateList from "./StateList.js";
import CityList from "./CityList.js";
import AreaList from "./AreaList.js";
import ClassType from "./ClassType.js";
import InstituteAcademicType from "./InstituteAcademicType.js";
import InstituteAffiliateType from "./InstituteAffiliateType.js";
import InstituteEmailType from "./InstituteEmailType.js";
import InstituteHighlightsType from "./InstituteHighlightsType.js";
import InstituteInfrastructureType from "./InstituteInfrastructureType.js";
import InstitutePhoneType from "./InstitutePhoneType.js";
import InstituteShiftType from "./InstituteShiftType.js";
import InstituteSystemType from "./InstituteSystemType.js";
import SectorType from "./SectorType.js";
import InstitutePrimaryDetails from "./institutePrimaryDetails.js";
import InstituteHighlightsDetails from "./InstituteHighlightsDetails.js";
import InstituteInfrastructureDetails from "./InstituteInfrastructureDetails.js";
import InstituteLocationsDetails from "./InstituteLocationsDetails.js";
import InstituteShiftDetails from "./InstituteShiftDetails.js";
import InstitutePhoneDetails from "./InstitutePhonesDetails.js";
import InstituteEmailDetails from "./InstituteEmailsDetails.js";
import InstituteCampusDetails from "./InstituteCampusDetails.js";
import InstituteBasicDetails from "./InstituteBasicDetails.js";

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

// UserSuperMappings.user_id → User.id
UserSuperMappings.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(UserSuperMappings, { foreignKey: "user_id", as: "userSuperMappings" });

// UserSuperMappings.super_admin_id → SuperAdmin.super_admin_id
UserSuperMappings.belongsTo(SuperAdmin, { foreignKey: "super_admin_id", as: "superAdmin" });
SuperAdmin.hasMany(UserSuperMappings, { foreignKey: "super_admin_id", as: "userSuperMappings" });

// SubModules.created_by → SuperAdmin.super_admin_id
SubModules.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(SubModules, { foreignKey: "created_by", as: "subModules" });

// Institute.created_by → SuperAdmin.super_admin_id
Institute.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(Institute, { foreignKey: "created_by", as: "institutes" });

// InstituteType.created_by → SuperAdmin.super_admin_id
InstituteType.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(InstituteType, { foreignKey: "created_by", as: "instituteTypes" });

//InstituteModules.module_id -> Modules.module_id
InstituteModules.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(InstituteModules, { foreignKey: "module_id", as: "instituteModules" });

//subModule.module_id -> Modules.module_id
SubModules.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(SubModules, { foreignKey: "module_id", as: "subModules" });

//SuperModules.module_id -> Modules.module_id
SuperModules.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(SuperModules, { foreignKey: "module_id", as: "superModules" });

//UserModuleMappings.module_id -> Modules.module_id
UserModuleMappings.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(UserModuleMappings, { foreignKey: "module_id", as: "userModuleMappings" });

//SubModulePermissionMapping.user_id -> User.id
SubModulesPermissionsMapping.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(SubModulesPermissionsMapping, { foreignKey: "user_id", as: "SubModulesPermissionsMapping" });

//SubModulesPermissionsMapping.module_id -> Modules.module_id
SubModulesPermissionsMapping.belongsTo(Modules, { foreignKey: "module_id", as: "module" });
Modules.hasMany(SubModulesPermissionsMapping, { foreignKey: "module_id", as: "subModulesPermissionsMappings" });

//SubModulesPermissionsMapping.sub_module_permission_id -> SubModulesPermissions.sub_module_permission_id
SubModulesPermissionsMapping.belongsTo(SubModules, { foreignKey: "sub_module_id", as: "subModules" });
SubModules.hasMany(SubModulesPermissionsMapping, { foreignKey: "sub_module_id", as: "subModulesPermissionsMappings" });

//subModulesPermissionsMapping.permission_type_id -> PermissionType.permission_type_id
SubModulesPermissionsMapping.belongsTo(PermissionType, { foreignKey: "permission_type_id", as: "permissionType" });
PermissionType.hasMany(SubModulesPermissionsMapping, { foreignKey: "permission_type_id", as: "subModulesPermissionsMappings" });

//Institute.institute_type_id -> InstituteType.institute_type_id
Institute.belongsTo(InstituteType, { foreignKey: "institute_type_id", as: "instituteType" });
InstituteType.hasMany(Institute, { foreignKey: "institute_type_id", as: "institutes" });

//UserInstituteMappings.institute_admin_id -> InstituteAdmins.institute_admin_id
UserInstituteMappings.belongsTo(InstituteAdmin, { foreignKey: "institute_admin_id", as: "instituteAdmin" });
InstituteAdmin.hasMany(UserInstituteMappings, { foreignKey: "institute_admin_id", as: "userInstituteMappings" });

//userInstituteMappings.institute_id -> Institutes.id
UserInstituteMappings.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(UserInstituteMappings, { foreignKey: "institute_id", as: "userInstituteMappings" });

// PermissionType.created_by → SuperAdmin.super_admin_id
PermissionType.belongsTo(SuperAdmin, { foreignKey: "created_by", as: "creator" });
SuperAdmin.hasMany(PermissionType, { foreignKey: "created_by", as: "permissions" });

// state.created_by → User.id
StateList.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(StateList, { foreignKey: "created_by", as: "StateList" });


// city.state_id -> state.state_id
CityList.belongsTo(StateList, { foreignKey: "state_id", as: "state" });
StateList.hasMany(CityList, { foreignKey: "state_id", as: "CityList" });

// city.created_by -> User.id
CityList.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(CityList, { foreignKey: "created_by", as: "CityList" });

// Area.created_by -> User.id
AreaList.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(AreaList, { foreignKey: "created_by", as: "AreaList" });

// area.city_id -> city.city_id
AreaList.belongsTo(CityList, { foreignKey: "city_id", as: "city" });
CityList.hasMany(AreaList, { foreignKey: "city_id", as: "AreaList" });

// area.state_id -> state.state_id
AreaList.belongsTo(StateList, { foreignKey: "state_id", as: "state" });
StateList.hasMany(AreaList, { foreignKey: "state_id", as: "AreaList" });

//ClassType.created_by -> User.id
ClassType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(ClassType, { foreignKey: "created_by", as: "classTypes" });

//InstituteAcademicType.created_by -> User.id
InstituteAcademicType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteAcademicType, { foreignKey: "created_by", as: "instituteAcademicTypes" });

//InstituteAffiliateType.created_by -> User.id
InstituteAffiliateType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteAffiliateType, { foreignKey: "created_by", as: "instituteAffiliateTypes" });

// InstituteEmailType.created_by -> User.id
InstituteEmailType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteEmailType, { foreignKey: "created_by", as: "instituteEmailTypes" });

// InstituteHighlightsType.created_by -> User.id
InstituteHighlightsType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteHighlightsType, { foreignKey: "created_by", as: "instituteHighlightsTypes" });

// InstituteInfrastructureType.created_by -> User.id
InstituteInfrastructureType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteInfrastructureType, { foreignKey: "created_by", as: "instituteInfrastructureTypes" });

// InstitutePhoneType.created_by -> User.id
InstitutePhoneType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstitutePhoneType, { foreignKey: "created_by", as: "institutePhoneTypes" });

// InstituteShiftType.created_by -> User.id
InstituteShiftType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteShiftType, { foreignKey: "created_by", as: "instituteShiftTypes" });

// InstituteSystemType.created_by -> User.id
InstituteSystemType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(InstituteSystemType, { foreignKey: "created_by", as: "instituteSystemTypes" });

// SectorType.created_by -> User.id
SectorType.belongsTo(User, { foreignKey: "created_by", as: "creator" });
User.hasMany(SectorType, { foreignKey: "created_by", as: "sectorTypes" });

//InstitutePrimaryDetails.institute_system_type_id -> InstituteSystemType.institute_system_type_id
InstitutePrimaryDetails.belongsTo(InstituteSystemType, { foreignKey: "institute_system_type_id", as: "instituteSystemType" });
InstituteSystemType.hasMany(InstitutePrimaryDetails, { foreignKey: "institute_system_type_id", as: "institutePrimaryDetails" });

// InstitutePrimaryDetails.institute_academic_type_id -> InstituteAcademicType.institute_academic_type_id
InstitutePrimaryDetails.belongsTo(InstituteAcademicType, { foreignKey: "institute_academic_type_id", as: "instituteAcademicType" });
InstituteAcademicType.hasMany(InstitutePrimaryDetails, { foreignKey: "institute_academic_type_id", as: "institutePrimaryDetails" });

//InstitutePrimaryDetails.institute_affiliate_type_id -> InstituteAffiliateType.institute_affiliate_type_id
InstitutePrimaryDetails.belongsTo(InstituteAffiliateType, { foreignKey: "institute_affiliate_type_id", as: "instituteAffiliateType" });
InstituteAffiliateType.hasMany(InstitutePrimaryDetails, { foreignKey: "institute_affiliate_type_id", as: "institutePrimaryDetails" });

//InstitutePrimaryDetails.institute_type_id -> InstituteType.institute_type_id
InstitutePrimaryDetails.belongsTo(InstituteType, { foreignKey: "institute_type_id", as: "instituteType" });
InstituteType.hasMany(InstitutePrimaryDetails, { foreignKey: "institute_type_id", as: "institutePrimaryDetails" });

// InstituteHighlightsDetails.institute_id -> Institute.id
InstituteHighlightsDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteHighlightsDetails, { foreignKey: "institute_id", as: "InstituteHighlightsDetails" });

//InstituteHighlightsDetails.institute_highlights_type_id -> InstituteHighlightsType.institute_highlights_type_id
InstituteHighlightsDetails.belongsTo(InstituteHighlightsType, { foreignKey: "institute_highlights_type_id", as: "instituteHighlightsType" });
InstituteHighlightsType.hasMany(InstituteHighlightsDetails, { foreignKey: "institute_highlights_type_id", as: "InstituteHighlightsDetails" });

// InstituteInfrastructureDetails.institute_id -> Institute.id
InstituteInfrastructureDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteInfrastructureDetails, { foreignKey: "institute_id", as: "InstituteInfrastructureDetails" });

// InstituteInfrastructureDetails.infra_id - > InstituteInfrastructureType.infra_id
InstituteInfrastructureDetails.belongsTo(InstituteInfrastructureType, { foreignKey: "infra_id", as: "instituteInfrastructureType" });
InstituteInfrastructureType.hasMany(InstituteInfrastructureDetails, { foreignKey: "infra_id", as: "InstituteInfrastructureDetails" });

// InstituteLocationsDetails.institute_id -> Institute.id
InstituteLocationsDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteLocationsDetails, { foreignKey: "institute_id", as: "InstituteLocationsDetails" });

// InstituteLocationsDetails.state_id -> StateList.state_id
InstituteLocationsDetails.belongsTo(StateList, { foreignKey: "state_id", as: "state" });
StateList.hasMany(InstituteLocationsDetails, { foreignKey: "state_id", as: "InstituteLocationsDetails" });

// InstituteLocationsDetails.city_id -> CityList.city_id
InstituteLocationsDetails.belongsTo(CityList, { foreignKey: "city_id", as: "city" });
CityList.hasMany(InstituteLocationsDetails, { foreignKey: "city_id", as: "InstituteLocationsDetails" });

// InstituteLocationsDetails.area_id -> AreaList.area_id
InstituteLocationsDetails.belongsTo(AreaList, { foreignKey: "area_id", as: "area" });
AreaList.hasMany(InstituteLocationsDetails, { foreignKey: "area_id", as: "InstituteLocationsDetails" });

//InstituteShiftDetails.institute_id -> Institute.id
InstituteShiftDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteShiftDetails, { foreignKey: "institute_id", as: "InstituteShiftDetails" });

//InstituteShiftDetails.institute_shift_type_id -> InstituteShiftType.institute_shift_type_id
InstituteShiftDetails.belongsTo(InstituteShiftType, { foreignKey: "institute_shift_type_id", as: "instituteShiftType" });
InstituteShiftType.hasMany(InstituteShiftDetails, { foreignKey: "institute_shift_type_id", as: "InstituteShiftDetails" });

//InstitutePhoneDetails.institute_id -> Institute.id
InstitutePhoneDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstitutePhoneDetails, { foreignKey: "institute_id", as: "InstitutePhoneDetails" });

//InstituteEmailDetails.institute_id -> Institute.id
InstituteEmailDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteEmailDetails, { foreignKey: "institute_id", as: "InstituteEmailDetails" });

//InstituteEmailDetails.institute_email_type_id -> InstituteEmailType.institute_email_type_id
InstituteEmailDetails.belongsTo(InstituteEmailType, { foreignKey: "institute_email_type_id", as: "instituteEmailType" });
InstituteEmailType.hasMany(InstituteEmailDetails, { foreignKey: "institute_email_type_id", as: "InstituteEmailDetails" });

//InstituteCampusDetails.institute_id -> Institute.id
InstituteCampusDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteCampusDetails, { foreignKey: "institute_id", as: "InstituteCampusDetails" });

//InstituteCampusDetails.class_type_id -> ClassType.class_type_id
InstituteCampusDetails.belongsTo(ClassType, { foreignKey: "class_type_id", as: "classType" });
ClassType.hasMany(InstituteCampusDetails, { foreignKey: "class_type_id", as: "InstituteCampusDetails" });

//InstituteBasicDetails.institute_id -> Institute.id
InstituteBasicDetails.belongsTo(Institute, { foreignKey: "institute_id", as: "institute" });
Institute.hasMany(InstituteBasicDetails, { foreignKey: "institute_id", as: "InstituteBasicDetails" });

export {
    User,
    Modules,
    UserInstituteMappings,
    UserSuperMappings,
    UserModuleMappings,
    SubModulesPermissionsMapping,
    InstituteType,
    SuperAdmin,
    SuperModules,
    Institute,
    InstituteModules,
    InstituteAdmin,
    PermissionType,
    SubModules,
    StateList,
    CityList,
    AreaList,
    ClassType,
    InstituteAcademicType,
    InstituteAffiliateType, 
    InstituteEmailType,
    InstituteHighlightsType,
    InstituteInfrastructureType,
    InstitutePhoneType,
    InstituteShiftType,
    InstituteSystemType,
    SectorType,
    InstitutePrimaryDetails,
    InstituteHighlightsDetails,
    InstituteInfrastructureDetails,
    InstituteLocationsDetails,
    InstituteShiftDetails,
    InstitutePhoneDetails,
    InstituteEmailDetails,
    InstituteCampusDetails,
    InstituteBasicDetails
};