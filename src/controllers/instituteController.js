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
    InstituteMapping,
    InstituteSocialMedia,
    InstituteSocialMediaType,
    InstituteSocialMediaDetails,
    InstituteYoutubeLink,
    InstituteYoutubeLinkType,
    InstituteYoutubeLinkDetails,
    InstituteGallery,
    Gallery,
    MediaType,
    GalleryDocument
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

        // Area validation
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

        // City validation
        if (city_id) {
            const city = await CityList.findByPk(city_id);
            if (!city) return res.status(404).json({ message: "City not found" });

            if (state_id && city.state_id !== state_id) {
                return res.status(400).json({
                    message: "Mismatch: city_id does not belong to the given state_id",
                });
            }
        }

        // State validation
        if (state_id) {
            const state = await StateList.findByPk(state_id);
            if (!state) return res.status(404).json({ message: "State not found" });
        }

        // Primary details validation
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

        // Campus details validation
        const { class_type_id } = req.body.campusDetails || {};
        if (class_type_id) {
            const classType = await ClassType.findByPk(class_type_id);
            if (!classType)
                return res.status(404).json({ message: "Class type not found" });
        }

        // 1️ Create Institute root
        const institute = await Institute.create(
            {
                ...req.body,
                institute_type_id: req.body.institute_type_id,
                created_by: req.userId,   // ✅ will map to users.id
            },
            { transaction: t }
        );

        // 2️ Highlights + Details
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

        // 3️ Infrastructure + Details
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

        // 4️ Phone + Details
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

        // 5️ Email + Details
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

        // 6️ Shift + Details
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

        // 7 socialMedia + Details
        const socialMedia = await InstituteSocialMedia.create({}, { transaction: t });
        if (req.body.socialMediaDetails?.length) {
            for (const sh of req.body.socialMediaDetails) {
                const socialMediaType = await InstituteSocialMediaType.findByPk(
                    sh.institute_social_media_type_id
                );
                if (!socialMediaType)
                    return res.status(404).json({ message: "social media type not found" });

                await InstituteSocialMediaDetails.create(
                    {
                        institute_social_media_id: socialMedia.institute_social_media_id,
                        institute_social_media_type_id: sh.institute_social_media_type_id,
                        social_media_url: sh.social_media_url,
                    },
                    { transaction: t }
                );
            }
        }

        // 8 youtubeLink + Details
        const youtubeLink = await InstituteYoutubeLink.create({}, { transaction: t });
        if (req.body.youtubeLinkDetails?.length) {
            for (const sh of req.body.youtubeLinkDetails) {
                const youtubeLinkType = await InstituteYoutubeLinkType.findByPk(
                    sh.institute_youtube_link_type_id
                );
                if (!youtubeLinkType)
                    return res.status(404).json({ message: "youtube link type not found" });

                await InstituteYoutubeLinkDetails.create(
                    {
                        institute_youtube_link_id: youtubeLink.institute_youtube_link_id,
                        institute_youtube_link_type_id: sh.institute_youtube_link_type_id,
                    },
                    { transaction: t }
                );
            }
        }

        // 9 Primary Details
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

        // 10 Campus Details
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

        // 11 Basic Details
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

        // 12 Location Details
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

        // 13 create Gallery 
        const instituteGallery = await InstituteGallery.create({}, { transaction: t });
        if (req.body.galleries?.length) {
            for (const g of req.body.galleries) {
                const gallery = await Gallery.create(
                    {
                        institute_gallery_id: instituteGallery.institute_gallery_id,
                        institute_id: institute.id,
                        gallery_name: g.gallery_name
                    },
                    { transaction: t }
                );

                if (g.documents?.length) {
                    for (const doc of g.documents) {
                        // validate media_type_id
                        const mediaType = await MediaType.findByPk(doc.media_type_id);
                        if (!mediaType) {
                            return res.status(404).json({ message: "Media type not found" });
                        }

                        await GalleryDocument.create(
                            {
                                gallery_id: gallery.gallery_id,
                                url: doc.url,
                                media_type_id: doc.media_type_id
                            },
                            { transaction: t }
                        );
                    }
                }
            }
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
                institute_youtube_link_id: youtubeLink?.institute_youtube_link_id,
                institute_social_media_id: socialMedia?.institute_social_media_id,
                institute_gallery_id: instituteGallery?.institute_gallery_id
            },
            { transaction: t }
        );

        // Commit transaction
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
                {
                    model: InstituteMapping,
                    as: "instituteMapping",
                    include: [
                        { model: InstituteHighlights, as: "instituteHighlights", include: [{ model: InstituteHighlightsDetails, as: "instituteHighlightsDetails" }] },
                        { model: InstituteInfrastructure, as: "instituteInfrastructure", include: [{ model: InstituteInfrastructureDetails, as: "instituteInfrastructureDetails" }] },
                        { model: InstitutePhone, as: "institutePhone", include: [{ model: InstitutePhoneDetails, as: "institutePhoneDetails" }] },
                        { model: InstituteEmail, as: "instituteEmail", include: [{ model: InstituteEmailDetails, as: "instituteEmailDetails" }] },
                        { model: InstituteShift, as: "instituteShift", include: [{ model: InstituteShiftDetails, as: "instituteShiftDetails" }] },
                        { model: InstituteSocialMedia, as: "instituteSocialMedia", include: [{ model: InstituteSocialMediaDetails, as: "instituteSocialMediaDetails" }] },
                        { model: InstituteYoutubeLink, as: "instituteYoutubeLink", include: [{ model: InstituteYoutubeLinkDetails, as: "instituteYoutubeLinkDetails" }] },
                        { model: InstitutePrimaryDetails, as: "institutePrimaryDetails" },
                        { model: InstituteCampusDetails, as: "campuse" },
                        { model: InstituteBasicDetails, as: "InstituteBasicDetails" },
                        { model: InstituteLocationsDetails, as: "InstituteLocationsDetails" },
                        {
                            model: InstituteGallery,
                            as: "instituteGallery",
                            include: [
                                {
                                    model: Gallery,
                                    as: "gallery",
                                    include: [
                                        {
                                            model: GalleryDocument,
                                            as: "galleryDocument",
                                            include: [
                                                { model: MediaType, as: "mediaType" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            limit,
            offset,
        });

        res.json({
            data,
            totalItems: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            pageSize: limit,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInstituteById = async (req, res) => {
    try {
        const institute = await Institute.findByPk(req.params.id, {
            include: [
                { model: InstituteType, as: "instituteType" },
                {
                    model: InstituteMapping,
                    as: "instituteMapping",
                    include: [
                        { model: InstituteHighlights, as: "instituteHighlights", include: [{ model: InstituteHighlightsDetails, as: "instituteHighlightsDetails" }] },
                        { model: InstituteInfrastructure, as: "instituteInfrastructure", include: [{ model: InstituteInfrastructureDetails, as: "instituteInfrastructureDetails" }] },
                        { model: InstitutePhone, as: "institutePhone", include: [{ model: InstitutePhoneDetails, as: "institutePhoneDetails" }] },
                        { model: InstituteEmail, as: "instituteEmail", include: [{ model: InstituteEmailDetails, as: "instituteEmailDetails" }] },
                        { model: InstituteShift, as: "instituteShift", include: [{ model: InstituteShiftDetails, as: "instituteShiftDetails" }] },
                        { model: InstituteSocialMedia, as: "instituteSocialMedia", include: [{ model: InstituteSocialMediaDetails, as: "instituteSocialMediaDetails" }] },
                        { model: InstituteYoutubeLink, as: "instituteYoutubeLink", include: [{ model: InstituteYoutubeLinkDetails, as: "instituteYoutubeLinkDetails" }] },
                        { model: InstitutePrimaryDetails, as: "institutePrimaryDetails" },
                        { model: InstituteCampusDetails, as: "campuses" },
                        { model: InstituteBasicDetails, as: "InstituteBasicDetails" },
                        { model: InstituteLocationsDetails, as: "InstituteLocationsDetails" },
                        {
                            model: InstituteGallery,
                            as: "instituteGallery",
                            include: [
                                {
                                    model: Gallery,
                                    as: "gallery",
                                    include: [
                                        {
                                            model: GalleryDocument,
                                            as: "galleryDocument",
                                            include: [
                                                { model: MediaType, as: "mediaType" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
        });

        if (!institute) return res.status(404).json({ message: "Institute not found" });

        res.json(institute);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInstitute = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const instituteId = req.params.id;

        const institute = await Institute.findByPk(instituteId);
        if (!institute) {
            return res.status(404).json({ message: "Institute not found" });
        }

        // Update root institute fields
        await institute.update({ ...req.body }, { transaction: t });

        // ✅ Update Primary Details
        if (req.body.primaryDetails) {
            await InstitutePrimaryDetails.upsert(
                { ...req.body.primaryDetails, institute_id: instituteId },
                { transaction: t }
            );
        }

        // ✅ Update Campus Details
        if (req.body.campusDetails) {
            await InstituteCampusDetails.upsert(
                { ...req.body.campusDetails, institute_id: instituteId },
                { transaction: t }
            );
        }

        // ✅ Update Basic Details
        if (req.body.basicDetails) {
            await InstituteBasicDetails.upsert(
                { ...req.body.basicDetails, institute_id: instituteId },
                { transaction: t }
            );
        }

        // ✅ Update Location
        if (req.body.locationDetails) {
            await InstituteLocationsDetails.upsert(
                { ...req.body.locationDetails, institute_id: instituteId },
                { transaction: t }
            );
        }

        // ✅ Update Highlights + Details
        if (req.body.highlightsDetails) {
            const highlight = await InstituteHighlights.findOne({ where: { institute_id: instituteId } });
            if (highlight) {
                await InstituteHighlightsDetails.destroy({ where: { institute_highlight_id: highlight.institute_highlight_id }, transaction: t });
                for (const h of req.body.highlightsDetails) {
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
        }

        // ✅ Update Infrastructure + Details
        if (req.body.infrastructureDetails) {
            const infra = await InstituteInfrastructure.findOne({ where: { institute_id: instituteId } });
            if (infra) {
                await InstituteInfrastructureDetails.destroy({ where: { institute_infrastructure_id: infra.institute_infrastructure_id }, transaction: t });
                for (const inf of req.body.infrastructureDetails) {
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
        }

        // ✅ Update Phones + Details
        if (req.body.phoneDetails) {
            const phone = await InstitutePhone.findOne({ where: { institute_id: instituteId } });
            if (phone) {
                await InstitutePhoneDetails.destroy({ where: { institute_phone_id: phone.institute_phone_id }, transaction: t });
                for (const ph of req.body.phoneDetails) {
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
        }

        // ✅ Update Emails + Details
        if (req.body.emailDetails) {
            const email = await InstituteEmail.findOne({ where: { institute_id: instituteId } });
            if (email) {
                await InstituteEmailDetails.destroy({ where: { institute_email_id: email.institute_email_id }, transaction: t });
                for (const em of req.body.emailDetails) {
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
        }

        // ✅ Update Shifts + Details
        if (req.body.shiftDetails) {
            const shift = await InstituteShift.findOne({ where: { institute_id: instituteId } });
            if (shift) {
                await InstituteShiftDetails.destroy({ where: { institute_shift_id: shift.institute_shift_id }, transaction: t });
                for (const sh of req.body.shiftDetails) {
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
        }

        // ✅ Update Social Media + Details
        if (req.body.socialMediaDetails) {
            const social = await InstituteSocialMedia.findOne({ where: { institute_id: instituteId } });
            if (social) {
                await InstituteSocialMediaDetails.destroy({ where: { institute_social_media_id: social.institute_social_media_id }, transaction: t });
                for (const sm of req.body.socialMediaDetails) {
                    await InstituteSocialMediaDetails.create(
                        {
                            institute_social_media_id: social.institute_social_media_id,
                            institute_social_media_type_id: sm.institute_social_media_type_id,
                            social_media_url: sm.social_media_url,
                        },
                        { transaction: t }
                    );
                }
            }
        }

        // ✅ Update Youtube + Details
        if (req.body.youtubeLinkDetails) {
            const yt = await InstituteYoutubeLink.findOne({ where: { institute_id: instituteId } });
            if (yt) {
                await InstituteYoutubeLinkDetails.destroy({ where: { institute_youtube_link_id: yt.institute_youtube_link_id }, transaction: t });
                for (const y of req.body.youtubeLinkDetails) {
                    await InstituteYoutubeLinkDetails.create(
                        {
                            institute_youtube_link_id: yt.institute_youtube_link_id,
                            institute_youtube_link_type_id: y.institute_youtube_link_type_id,
                        },
                        { transaction: t }
                    );
                }
            }
        }

        // ✅ Update Galleries + Documents
        if (req.body.galleries) {
            const ig = await InstituteGallery.findOne({ where: { institute_id: instituteId } });
            if (ig) {
                await Gallery.destroy({ where: { institute_gallery_id: ig.institute_gallery_id }, transaction: t });
                for (const g of req.body.galleries) {
                    const gallery = await Gallery.create(
                        {
                            institute_gallery_id: ig.institute_gallery_id,
                            institute_id: instituteId,
                            gallery_name: g.gallery_name
                        },
                        { transaction: t }
                    );
                    if (g.documents?.length) {
                        for (const doc of g.documents) {
                            await GalleryDocument.create(
                                {
                                    gallery_id: gallery.gallery_id,
                                    url: doc.url,
                                    media_type_id: doc.media_type_id
                                },
                                { transaction: t }
                            );
                        }
                    }
                }
            }
        }

        await t.commit();
        res.json({ message: "Institute updated successfully" });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

export const deleteInstitute = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const instituteId = req.params.id;

        const institute = await Institute.findByPk(instituteId);
        if (!institute) {
            return res.status(404).json({ message: "Institute not found" });
        }

        const mapping = await InstituteMapping.findOne({ where: { institute_id: instituteId } });

        if (mapping) {
            if (mapping.institute_gallery_id) {
                const galleries = await Gallery.findAll({ where: { institute_id: instituteId } });
                for (const g of galleries) {
                    await GalleryDocument.destroy({ where: { gallery_id: g.gallery_id }, transaction: t });
                }
                await Gallery.destroy({ where: { institute_id: instituteId }, transaction: t });
                await InstituteGallery.destroy({ where: { institute_gallery_id: mapping.institute_gallery_id }, transaction: t });
            }

            if (mapping.institute_highlight_id) {
                await InstituteHighlightsDetails.destroy({ where: { institute_highlight_id: mapping.institute_highlight_id }, transaction: t });
                await InstituteHighlights.destroy({ where: { institute_highlight_id: mapping.institute_highlight_id }, transaction: t });
            }

            if (mapping.institute_infrastructure_id) {
                await InstituteInfrastructureDetails.destroy({ where: { institute_infrastructure_id: mapping.institute_infrastructure_id }, transaction: t });
                await InstituteInfrastructure.destroy({ where: { institute_infrastructure_id: mapping.institute_infrastructure_id }, transaction: t });
            }

            if (mapping.institute_phone_id) {
                await InstitutePhoneDetails.destroy({ where: { institute_phone_id: mapping.institute_phone_id }, transaction: t });
                await InstitutePhone.destroy({ where: { institute_phone_id: mapping.institute_phone_id }, transaction: t });
            }

            if (mapping.institute_email_id) {
                await InstituteEmailDetails.destroy({ where: { institute_email_id: mapping.institute_email_id }, transaction: t });
                await InstituteEmail.destroy({ where: { institute_email_id: mapping.institute_email_id }, transaction: t });
            }

            if (mapping.institute_shift_id) {
                await InstituteShiftDetails.destroy({ where: { institute_shift_id: mapping.institute_shift_id }, transaction: t });
                await InstituteShift.destroy({ where: { institute_shift_id: mapping.institute_shift_id }, transaction: t });
            }

            if (mapping.institute_social_media_id) {
                await InstituteSocialMediaDetails.destroy({ where: { institute_social_media_id: mapping.institute_social_media_id }, transaction: t });
                await InstituteSocialMedia.destroy({ where: { institute_social_media_id: mapping.institute_social_media_id }, transaction: t });
            }

            if (mapping.institute_youtube_link_id) {
                await InstituteYoutubeLinkDetails.destroy({ where: { institute_youtube_link_id: mapping.institute_youtube_link_id }, transaction: t });
                await InstituteYoutubeLink.destroy({ where: { institute_youtube_link_id: mapping.institute_youtube_link_id }, transaction: t });
            }

            if (mapping.institute_primary_details_id) {
                await InstitutePrimaryDetails.destroy({ where: { institute_primary_details_id: mapping.institute_primary_details_id }, transaction: t });
            }
            if (mapping.institute_campus_id) {
                await InstituteCampusDetails.destroy({ where: { institute_campus_id: mapping.institute_campus_id }, transaction: t });
            }
            if (mapping.institute_basic_details_id) {
                await InstituteBasicDetails.destroy({ where: { institute_basic_details_id: mapping.institute_basic_details_id }, transaction: t });
            }
            if (mapping.institute_location_id) {
                await InstituteLocationsDetails.destroy({ where: { institute_location_id: mapping.institute_location_id }, transaction: t });
            }
            await InstituteMapping.destroy({ where: { institute_id: instituteId }, transaction: t });
        }
        await Institute.destroy({ where: { id: instituteId }, transaction: t });

        await t.commit();
        return res.json({ message: "Institute and all related data deleted successfully" });

    } catch (error) {
        await t.rollback();
        console.error("Delete error:", error);
        return res.status(500).json({ error: error.message });
    }
};
