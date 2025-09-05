import { InstituteAdmin, InstituteModules, Modules, User, UserInstituteMappings, UserModuleMappings } from "../models/index.js";

export const instituteAuthValidationMW = async (req, res, next) => {
    try {
        const { email, mobile } = req.body;
        let user = null;

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

        const mapping = await UserInstituteMappings.findOne({
            where: { user_id: user.id },
            include: [
                {
                    model: InstituteAdmin,
                    as: "instituteAdmin",
                    attributes: ["institute_admin_id", "fname", "lname", "user_name", "profile_image", "institute_work_id", "dob", "is_native", "is_active"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "email", "mobile"]
                }
            ]
        });

        if (!mapping) {
            return res.status(404).json({ message: "InstituteAdmin does not exist" });
        }

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
                            model: InstituteModules,
                            as: "instituteModules",
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
            module_name: item.module.instituteModules?.module_name || null,
            path: item.module.instituteModules?.path || null
        }));

        req.instituteAdmin = {
            fname: mapping.instituteAdmin.fname,
            lname: mapping.instituteAdmin.lname,
            user_name: mapping.instituteAdmin.user_name,
            profile_image: mapping.instituteAdmin.profile_image,
            institute_work_id: mapping.instituteAdmin.institute_work_id,
            dob: mapping.instituteAdmin.dob,
            email: mapping.user.email,
            mobile: mapping.user.mobile,
            modules: modulesAccess
        };

        req.user = user;

        next();
    } catch (err) {
        console.error("Auth MW Error:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
