import { sequelize } from "../configs/connection.js";
import {
    Institute,
    InstituteType,
    SuperAdmin,
    InstituteHighlightsDetails,
    InstituteHighlights,
    InstituteInfrastructure,
    InstituteInfrastructureDetails,
    InstitutePhone,
    InstitutePhoneDetails,
    InstituteShift,
    InstituteShiftDetails,
    InstitutePrimaryDetails,
    InstituteEmail,
    InstituteEmailDetails,
    InstituteSystemType,
    InstituteAcademicType,
    InstituteAffiliateType,
    InstituteCampusDetails,
    InstituteBasicDetails,
    ClassType,
    InstituteLocationsDetails,
    InstituteHighlightsType,
    InstituteInfrastructureType,
    InstitutePhoneType,
    InstituteEmailType,
    InstituteShiftType,
    StateList,
    CityList,
    AreaList,
    InstituteMapping
} from "../models/index.js";

export const createInstitute = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }

        // Extract location details
        const { state_id, city_id, area_id } = req.body.locationDetails || {};

        // ✅ Area validation
        if (area_id) {
            const area = await AreaList.findByPk(area_id);
            if (!area) return res.status(404).json({ message: "Area not found" });

            if (area.city_id !== city_id || area.state_id !== state_id) {
                return res.status(400).json({
                    message:
                        "Mismatch: area_id does not belong to the given city_id or state_id",
                });
            }
        }

        // ✅ City validation
        if (city_id) {
            const city = await CityList.findByPk(city_id);
            if (!city) return res.status(404).json({ message: "City not found" });

            if (state_id && city.state_id !== state_id) {
                return res.status(400).json({
                    message: "Mismatch: city_id does not belong to the given state_id",
                });
            }
        }

        // ✅ State validation
        if (state_id) {
            const state = await StateList.findByPk(state_id);
            if (!state) return res.status(404).json({ message: "State not found" });
        }

        // ✅ Primary details validation
        const {
            institute_system_type_id,
            institute_academic_type_id,
            institute_affiliate_type_id,
        } = req.body.primaryDetails || {};

        if (institute_system_type_id) {
            const systemType = await InstituteSystemType.findByPk(
                institute_system_type_id
            );
            if (!systemType)
                return res.status(404).json({ message: "System type not found" });
        }

        if (institute_academic_type_id) {
            const academicType = await InstituteAcademicType.findByPk(
                institute_academic_type_id
            );
            if (!academicType)
                return res.status(404).json({ message: "Academic type not found" });
        }

        if (institute_affiliate_type_id) {
            const affiliateType = await InstituteAffiliateType.findByPk(
                institute_affiliate_type_id
            );
            if (!affiliateType)
                return res.status(404).json({ message: "Affiliate type not found" });
        }

        // ✅ Campus details validation
        const { class_type_id } = req.body.campusDetails || {};
        if (class_type_id) {
            const classType = await ClassType.findByPk(class_type_id);
            if (!classType)
                return res.status(404).json({ message: "Class type not found" });
        }

        // 1️⃣ Create Institute root
        const institute = await Institute.create(
            {
                ...req.body,
                institute_type_id: req.body.institute_type_id,
                created_by: req.userId,   // ✅ will map to users.id
            },
            { transaction: t }
        );

        // 2️⃣ Highlights + Details
        const highlight = await InstituteHighlights.create({}, { transaction: t });
        if (req.body.highlightsDetails?.length) {
            for (const h of req.body.highlightsDetails) {
                const highlightType = await InstituteHighlightsType.findByPk(
                    h.institute_highlights_type_id
                );
                if (!highlightType)
                    return res
                        .status(404)
                        .json({ message: "Highlight type not found" });

                await InstituteHighlightsDetails.create(
                    {
                        institute_highlight_id: highlight.institute_highlight_id,
                        institute_highlights_type_id: h.institute_highlights_type_id,
                        description: h.description,
                    },
                    { transaction: t }
                );
            }
        }

        // 3️⃣ Infrastructure + Details
        const infra = await InstituteInfrastructure.create({}, { transaction: t });
        if (req.body.infrastructureDetails?.length) {
            for (const inf of req.body.infrastructureDetails) {
                const infraType = await InstituteInfrastructureType.findByPk(
                    inf.infra_id
                );
                if (!infraType)
                    return res.status(404).json({ message: "Infra type not found" });

                await InstituteInfrastructureDetails.create(
                    {
                        institute_infrastructure_id: infra.institute_infrastructure_id,
                        infra_id: inf.infra_id,
                        isselected: inf.isselected ?? true,
                    },
                    { transaction: t }
                );
            }
        }

        // 4️⃣ Phone + Details
        const phone = await InstitutePhone.create({}, { transaction: t });
        if (req.body.phoneDetails?.length) {
            for (const ph of req.body.phoneDetails) {
                const phoneType = await InstitutePhoneType.findByPk(
                    ph.institute_phone_type_id
                );
                if (!phoneType)
                    return res.status(404).json({ message: "Phone type not found" });

                await InstitutePhoneDetails.create(
                    {
                        institute_phone_id: phone.institute_phone_id,
                        institute_phone_type_id: ph.institute_phone_type_id,
                        number: ph.number,
                        isvisible: ph.isvisible ?? true,
                    },
                    { transaction: t }
                );
            }
        }

        // 5️⃣ Email + Details
        const email = await InstituteEmail.create({}, { transaction: t });
        if (req.body.emailDetails?.length) {
            for (const em of req.body.emailDetails) {
                const emailType = await InstituteEmailType.findByPk(
                    em.institute_emails_type_id
                );
                if (!emailType)
                    return res.status(404).json({ message: "Email type not found" });

                await InstituteEmailDetails.create(
                    {
                        institute_email_id: email.institute_email_id,
                        institute_emails_type_id: em.institute_emails_type_id,
                        email: em.email,
                        isvisible: em.isvisible ?? true,
                    },
                    { transaction: t }
                );
            }
        }

        // 6️⃣ Shift + Details
        const shift = await InstituteShift.create({}, { transaction: t });
        if (req.body.shiftDetails?.length) {
            for (const sh of req.body.shiftDetails) {
                const shiftType = await InstituteShiftType.findByPk(
                    sh.institute_shift_type_id
                );
                if (!shiftType)
                    return res.status(404).json({ message: "Shift type not found" });

                await InstituteShiftDetails.create(
                    {
                        institute_shift_id: shift.institute_shift_id,
                        institute_shift_type_id: sh.institute_shift_type_id,
                        starting_hours: sh.starting_hours,
                        ending_hours: sh.ending_hours,
                    },
                    { transaction: t }
                );
            }
        }

        // 7️⃣ Primary Details
        let primaryDetails = null;
        if (req.body.primaryDetails) {
            primaryDetails = await InstitutePrimaryDetails.create(
                {
                    ...req.body.primaryDetails,
                    institute_id: institute.id,
                },
                { transaction: t }
            );
        }

        // 8️⃣ Campus Details
        let campusDetails = null;
        if (req.body.campusDetails) {
            campusDetails = await InstituteCampusDetails.create(
                {
                    ...req.body.campusDetails,
                    institute_id: institute.id,
                },
                { transaction: t }
            );
        }

        // 9️⃣ Basic Details
        let basicDetails = null;
        if (req.body.basicDetails) {
            basicDetails = await InstituteBasicDetails.create(
                {
                    ...req.body.basicDetails,
                    institute_id: institute.id,
                },
                { transaction: t }
            );
        }

        // 🔟 Location Details
        let locationDetails = null;
        if (req.body.locationDetails) {
            locationDetails = await InstituteLocationsDetails.create(
                {
                    ...req.body.locationDetails,
                    institute_id: institute.id,
                },
                { transaction: t }
            );
        }

        // Create mapping
        await InstituteMapping.create(
            {
                institute_id: institute.id,
                institute_phone_id: phone?.institute_phone_id,
                institute_email_id: email?.institute_email_id,
                institute_shift_id: shift?.institute_shift_id,
                institute_infrastructure_id: infra?.institute_infrastructure_id,
                institute_highlight_id: highlight?.institute_highlight_id,
                institute_primary_details_id: primaryDetails?.institute_primary_details_id,
                institute_campus_id: campusDetails?.institute_campus_id,
                institute_basic_details_id: basicDetails?.institute_basic_details_id,
                institute_location_id: locationDetails?.institute_location_id,
            },
            { transaction: t }
        );

        // ✅ Commit transaction
        await t.commit();

        return res.json({
            message: "Institute with all details created successfully",
            data: institute,
        });
    } catch (err) {
        await t.rollback();
        console.error("Error creating institute:", err);
        return res.status(500).json({ error: "Server error" });
    }
};


export const getAllInstitutes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { rows: data, count } = await Institute.findAndCountAll({
            include: [
                { model: InstituteType, as: "instituteType" },
                // { model: SuperAdmin, as: "creator", attributes: ["super_admin_id", "fname", "lname"] }
            ],
            limit,
            offset
        });

        if (!data.length) {
            return res.status(404).json({ error: "No institutes found" });
        }

        return res.json({
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit
        });
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

// export const createInstitute = async (req, res) => {
//     try {
//         const userId = req.userId;

//         if (!userId) {
//             return res.status(401).json({ error: "Unauthorized: no user ID" });
//         }

//         const data = await Institute.create({
//             ...req.body,
//             InstituteTypeId: req.body.institute_type_id,
//             created_by: userId
//         });

//         return res.json({ message: "Institute created", data });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Server error" });
//     }
// };

// export const createInstitute = async (req, res) => {
//     const t = await sequelize.transaction();
//     try {
//         const userId = req.userId;
//         if (!userId) {
//             return res.status(401).json({ error: "Unauthorized: no user ID" });
//         }
//         const systemType = await InstituteSystemType.findByPk(institute_system_type_id);
//         if (!systemType) {
//             return res.status(404).json({ message: "System type not found" });
//         }

//         const academicType = await InstituteAcademicType.findByPk(institute_academic_type_id);
//         if (!academicType) {
//             return res.status(404).json({ message: "Academic type not found" });
//         }

//         const affiliateType = await InstituteAffiliateType.findByPk(institute_affiliate_type_id);
//         if (!affiliateType) {
//             return res.status(404).json({ message: "Affiliate type not found" });
//         }
//         const classType = await ClassType.findByPk(class_type_id);
//         if (!classType) {
//             return res.status(404).json({ message: "Class type not found" });
//         }

//         // 1. Create Institute
//         const institute = await Institute.create(
//             {
//                 ...req.body,
//                 institute_type_id: req.body.institute_type_id,
//                 created_by: userId,
//             },
//             { transaction: t }
//         );

//         // 2. Create Highlights + Details
//         const highlight = await InstituteHighlights.create({}, { transaction: t });
//         if (req.body.highlightsDetails?.length > 0) {
//             for (const h of req.body.highlightsDetails) {
//                 await InstituteHighlightsDetails.create(
//                     {
//                         institute_highlight_id: highlight.institute_highlight_id,
//                         institute_highlights_type_id: h.institute_highlights_type_id,
//                         description: h.description,
//                     },
//                     { transaction: t }
//                 );
//             }
//         }

//         // 3. Create Infrastructure + Details
//         const infra = await InstituteInfrastructure.create({}, { transaction: t });
//         if (req.body.infrastructureDetails?.length > 0) {
//             for (const inf of req.body.infrastructureDetails) {
//                 await InstituteInfrastructureDetails.create(
//                     {
//                         institute_infrastructure_id: infra.institute_infrastructure_id,
//                         infra_id: inf.infra_id,
//                         isselected: inf.isselected ?? true,
//                     },
//                     { transaction: t }
//                 );
//             }
//         }

//         // 4. Create Phone + Details
//         const phone = await InstitutePhone.create({}, { transaction: t });
//         if (req.body.phoneDetails?.length > 0) {
//             for (const ph of req.body.phoneDetails) {
//                 await InstitutePhoneDetails.create(
//                     {
//                         institute_phone_id: phone.institute_phone_id,
//                         institute_phone_type_id: ph.institute_phone_type_id,
//                         isvisible: ph.isvisible ?? true,
//                     },
//                     { transaction: t }
//                 );
//             }
//         }

//         // 5. Create Email + Details
//         const email = await InstituteEmail.create({}, { transaction: t });
//         if (req.body.emailDetails?.length > 0) {
//             for (const em of req.body.emailDetails) {
//                 await InstituteEmailDetails.create(
//                     {
//                         institute_email_id: email.institute_email_id,
//                         institute_emails_type_id: em.institute_emails_type_id,
//                         email: em.email,
//                         isvisible: em.isvisible ?? true,
//                     },
//                     { transaction: t }
//                 );
//             }
//         }

//         // 6. Create Shift + Details
//         const shift = await InstituteShift.create({}, { transaction: t });
//         if (req.body.shiftDetails?.length > 0) {
//             for (const sh of req.body.shiftDetails) {
//                 await InstituteShiftDetails.create(
//                     {
//                         institute_shift_id: shift.institute_shift_id,
//                         institute_shift_type_id: sh.institute_shift_type_id,
//                         starting_hours: sh.starting_hours,
//                         ending_hours: sh.ending_hours,
//                     },
//                     { transaction: t }
//                 );
//             }
//         }

//         // 7. Create Primary Details
//         if (req.body.primaryDetails) {
//             await InstitutePrimaryDetails.create(
//                 {
//                     ...req.body.primaryDetails,
//                     institute_id: institute.id,
//                 },
//                 { transaction: t }
//             );
//         }

//         // 8. create Campus Details
//         if (req.body.campusDetails) {
//             await InstituteCampusDetails.create({
//                 ...req.body.campusDetails,
//                 institute_id: institute.id,
//             })
//         }

//         //9. create basic details
//         if (req.body.basicDetails) {
//             await InstituteBasicDetails.create({
//                 ...req.body.basicDetails,
//                 institute_id: institute.id,
//             })
//         }

//         // ✅ Commit transaction
//         await t.commit();

//         return res.json({
//             message: "Institute with all details created successfully",
//             data: institute,
//         });
//     } catch (err) {
//         await t.rollback();
//         console.error("Error creating institute:", err);
//         return res.status(500).json({ error: "Server error" });
//     }
// };