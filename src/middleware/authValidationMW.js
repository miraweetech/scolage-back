import {
    Modules,
    SuperAdmin,
    SuperModules,
    User,
    UserModuleMappings,
    UserSuperMappings,
    SubModulesPermissionsMapping,
    SubModules,
    PermissionType
} from "../models/index.js";

import _ from "lodash";

export const authValidationMW = async (req, res, next) => {
    try {
        const { email, mobile } = req.body;
        let user = null;

        // Find user by email or mobile
        if (email) {
            user = await User.findOne({ where: { email } });
        } else if (mobile) {
            user = await User.findOne({ where: { mobile } });
        } else {
            return res.status(400).json({ message: "Email or mobile required" });
        }

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Fetch mapping with SuperAdmin
        const mapping = await UserSuperMappings.findOne({
            where: { user_id: user.id },
            include: [
                {
                    model: SuperAdmin,
                    as: "superAdmin",
                    attributes: ["super_admin_id", "fname", "lname", "user_name", "profile_image"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "email", "mobile"]
                }
            ]
        });

        if (!mapping) {
            return res.status(404).json({ message: "SuperAdmin does not exist" });
        }

        // Fetch modules + superModules + subModules
        const modulesAccessRaw = await UserModuleMappings.findAll({
            where: { user_id: user.id, is_deleted: false },
            include: [
                {
                    model: Modules,
                    as: "module",
                    attributes: [
                        "module_id",
                        "created_by",
                        "is_super",
                        "is_institute",
                        "is_active",
                        "status"
                    ],
                    include: [
                        {
                            model: SuperModules,
                            as: "superModules",
                            attributes: ["module_name", "path"]
                        },
                        {
                            model: SubModulesPermissionsMapping,
                            as: "subModulesPermissionsMappings",
                            attributes: [
                                "sub_modules_permissions_mapping_id",
                            ],
                            include: [
                                {
                                    model: SubModules,
                                    as: "subModules",
                                    attributes: ["sub_module_id", "title"]
                                },
                                {
                                    model: PermissionType,
                                    as: 'permissionType',
                                    attributes: ['title', 'can_edit']
                                }
                            ]
                        }
                    ]
                }
            ],
            raw: true,
            nest: true
        });

        const modulesAccess = modulesAccessRaw.map(item => ({
            user_module_mappings_id: item.user_module_mappings_id,
            user_id: item.user_id,
            module_id: item.module_id,
            is_deleted: item.is_deleted,
            created_at: item.created_at,
            created_by: item.module.created_by,
            is_super: item.module.is_super,
            is_institute: item.module.is_institute,
            is_active: item.module.is_active,
            status: item.module.status,
            module_name: item.module.superModules?.module_name || null,
            path: item.module.superModules?.path || null,
            subModule: item.module.subModulesPermissionsMappings
                ? {
                    sub_modules_permissions_ma: item.module.subModulesPermissionsMappings.sub_modules_permissions_mapping_id,
                    subModules: item.module.subModulesPermissionsMappings.subModules || null,
                    permissionType: item.module.subModulesPermissionsMappings.permissionType || null
                }
                : null
        }));

        // Group submodules per module_id
        const groupedModules = _(modulesAccess)
            .groupBy("module_id")
            .map(values => {
                const base = { ...values[0] };
                base.subModule = values
                    .map(v => v.subModule)
                    .filter(Boolean); // collect all subModules
                return base;
            })
            .value();

        // Attach to req
        req.superAdmin = {
            fname: mapping.superAdmin.fname,
            lname: mapping.superAdmin.lname,
            user_name: mapping.superAdmin.user_name,
            profile_image: mapping.superAdmin.profile_image,
            email: mapping.user.email,
            mobile: mapping.user.mobile,
            modules: groupedModules
        };

        req.user = user;

        next();
    } catch (err) {
        console.error("Auth MW Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

