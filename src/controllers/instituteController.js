import {
    Institute,
    InstituteType,
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
    GalleryDocument,
    InstituteSubject,
    SubjectType,
    SubjectDetails,
    EligibilityDetails,
    InstituteStaffManagement,
    DesignationType,
    QualificationType,
    StaffManagement,
    InstituteImage,
    InstituteImageDetails,
    Institute3DImage,
    Institute3DImageDetails,
    GalleryMediaMapping,
} from "../models/index.js";

export const createInstitute = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: no user ID" });
        }

        function checkDuplicateTypeIds(array, keyName) {
            if (!array?.length) return null;
            const typeIds = array.map(item => item[keyName]);
            const duplicates = typeIds.filter((id, idx) => typeIds.indexOf(id) !== idx);
            return duplicates.length ? [...new Set(duplicates)] : null;
        }

        const { state_id, city_id, area_id } = req.body.locationDetails || {};
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

        if (city_id) {
            const city = await CityList.findByPk(city_id);
            if (!city) return res.status(404).json({ message: "City not found" });

            if (state_id && city.state_id !== state_id) {
                return res.status(400).json({
                    message: "Mismatch: city_id does not belong to the given state_id",
                });
            }
        }

        if (state_id) {
            const state = await StateList.findByPk(state_id);
            if (!state) return res.status(404).json({ message: "State not found" });
        }

        const {
            syatem_type_id,
            academic_type_id,
            affiliate_type_id,
        } = req.body.primaryDetails || {};

        if (syatem_type_id) {
            const systemType = await InstituteSystemType.findByPk(
                syatem_type_id
            );
            if (!systemType)
                return res.status(404).json({ message: "System type not found" });
        }

        if (academic_type_id) {
            const academicType = await InstituteAcademicType.findByPk(
                academic_type_id
            );
            if (!academicType)
                return res.status(404).json({ message: "Academic type not found" });
        }

        if (affiliate_type_id) {
            const affiliateType = await InstituteAffiliateType.findByPk(
                affiliate_type_id
            );
            if (!affiliateType)
                return res.status(404).json({ message: "Affiliate type not found" });
        }

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
                created_by: req.userId,
            },
        );

        // 2️ Highlights + Details
        const highlight = await InstituteHighlights.create({});
        if (req.body.highlightsDetails?.length) {
            const dupHighlightIds = checkDuplicateTypeIds(req.body.highlightsDetails, "institute_highlights_type_id");
            if (dupHighlightIds) {
                return res.status(400).json({
                    message: `Duplicate highlight type ids not allowed`
                });
            }

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
                );
            }
        }

        // 3️ Infrastructure + Details
        const infra = await InstituteInfrastructure.create({});
        if (req.body.infrastructureDetails?.length) {
            const dupInfraIds = checkDuplicateTypeIds(req.body.infrastructureDetails, "infra_id");
            if (dupInfraIds) {
                return res.status(400).json({
                    message: `Duplicate infra ids not allowed`
                });
            }

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
                );
            }
        }

        // 4️ Phone + Details
        const phone = await InstitutePhone.create({});
        if (req.body.phoneDetails?.length) {
            const dupPhoneIds = checkDuplicateTypeIds(req.body.phoneDetails, "institute_phone_type_id");
            if (dupPhoneIds) {
                return res.status(400).json({
                    message: `Duplicate phone type ids not allowed`
                });
            }

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
                );
            }
        }

        // 5️ Email + Details
        const email = await InstituteEmail.create({});
        if (req.body.emailDetails?.length) {
            const dupEmailIds = checkDuplicateTypeIds(req.body.emailDetails, "institute_emails_type_id");
            if (dupEmailIds) {
                return res.status(400).json({
                    message: `Duplicate email type ids not allowed`
                });
            }

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
                );
            }
        }

        // 6️ Shift + Details
        const shift = await InstituteShift.create({});
        if (req.body.shiftDetails?.length) {
            const dupShiftIds = checkDuplicateTypeIds(req.body.shiftDetails, "institute_shift_type_id");
            if (dupShiftIds) {
                return res.status(400).json({
                    message: `Duplicate shift type ids not allowed`
                });
            }

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
                );
            }
        }

        // 7 socialMedia + Details
        const socialMedia = await InstituteSocialMedia.create({});
        if (req.body.socialMediaDetails?.length) {
            const dupSocialIds = checkDuplicateTypeIds(req.body.socialMediaDetails, "institute_social_media_type_id");
            if (dupSocialIds) {
                return res.status(400).json({
                    message: `Duplicate social media type ids not allowed`
                });
            }

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
                );
            }
        }

        // 8 youtubeLink + Details
        const youtubeLink = await InstituteYoutubeLink.create({});
        if (req.body.youtubeLinkDetails?.length) {
            const dupYoutubeIds = checkDuplicateTypeIds(req.body.youtubeLinkDetails, "institute_youtube_link_type_id");
            if (dupYoutubeIds) {
                return res.status(400).json({
                    message: `Duplicate youtube link type ids not allowed`
                });
            }

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
            );
        }

        // 13 create Gallery 
        const instituteGallery = await InstituteGallery.create({});
        if (req.body.galleries?.length) {
            for (const g of req.body.galleries) {
                const gallery = await Gallery.create(
                    {
                        institute_gallery_id: instituteGallery.institute_gallery_id,
                        institute_id: institute.id,
                        gallery_name: g.gallery_name
                    },
                );

                if (g.documents?.length) {
                    for (const doc of g.documents) {
                        const mediaType = await MediaType.findByPk(doc.media_type_id);
                        if (!mediaType) {
                            return res.status(404).json({ message: "Media type not found" });
                        }

                        await GalleryDocument.create(
                            {
                                gallery_id: gallery.gallery_id,
                                url: doc.url,
                                media_type_id: doc.media_type_id,
                                data: doc.data
                            },
                        );
                    }
                }
            }
        }
        // const instituteGallery = await InstituteGallery.create({});
        // if (req.body.galleries?.length) {
        //     const galleriesData = req.body.galleries.map(g => ({
        //         institute_gallery_id: instituteGallery.institute_gallery_id,
        //         institute_id: institute.id,
        //         gallery_name: g.gallery_name
        //     }));

        //     const createdGalleries = await Gallery.bulkCreate(galleriesData, { returning: true });

        //     const mappingsData = [];
        //     for (let i = 0; i < req.body.galleries.length; i++) {
        //         const g = req.body.galleries[i];
        //         const gallery = createdGalleries[i];

        //         if (g.documents?.length) {
        //             for (const doc of g.documents) {
        //                 mappingsData.push({
        //                     gallery_id: gallery.gallery_id,
        //                     media_type_id: doc.media_type_id
        //                 });
        //             }
        //         }
        //     }

        //     if (mappingsData.length) {
        //         await GalleryMediaMapping.bulkCreate(mappingsData, { ignoreDuplicates: true });
        //     }
        // }

        // 14 Subject + Details
        const subject = await InstituteSubject.create({});
        if (req.body.subjectDetails?.length) {
            const dupYoutubeIds = checkDuplicateTypeIds(req.body.subjectDetails, "subject_type_id");
            if (dupYoutubeIds) {
                return res.status(400).json({
                    message: `Duplicate subject type ids not allowed`
                });
            }
            for (const sh of req.body.subjectDetails) {
                const subjectType = await SubjectType.findByPk(
                    sh.subject_type_id
                );
                if (!subjectType)
                    return res.status(404).json({ message: "subject type not found" });

                await SubjectDetails.create(
                    {
                        institute_subject_id: subject.institute_subject_id,
                        subject_type_id: sh.subject_type_id,
                        description: sh.description,
                        max_fee: sh.max_fee,
                        min_fee: sh.min_fee,
                        no_of_seats: sh.no_of_seats
                    },
                );
            }
        }

        // 15 eligibility Details
        let eligibilityDetails = null;
        if (req.body.eligibilityDetails) {
            eligibilityDetails = await EligibilityDetails.create(
                {
                    ...req.body.eligibilityDetails,
                },
            );
        }

        // 16 staff management
        const staffManagement = await InstituteStaffManagement.create({});
        if (req.body.staffManagementDetails?.length) {
            for (const sh of req.body.staffManagementDetails) {
                const designationType = await DesignationType.findByPk(
                    sh.designation_type_id
                );
                if (!designationType)
                    return res.status(404).json({ message: "designation type not found" });

                const qualificationType = await QualificationType.findByPk(
                    sh.qualification_type_id
                )
                if (!qualificationType)
                    return res.status(404).json({ message: "qualification type not found" })

                await StaffManagement.create(
                    {
                        institute_staff_management_id: staffManagement.institute_staff_management_id,
                        qualification_type_id: sh.qualification_type_id,
                        designation_type_id: sh.designation_type_id,
                        profile_picture_url: sh.profile_picture_url,
                        name: sh.name,
                        total_experience_years: sh.total_experience_years,
                        current_experience_years: sh.current_experience_years,
                        about: sh.about
                    },
                );
            }
        }

        // 17 InstituteImage
        const instituteImage = await InstituteImage.create({});
        if (req.body.instituteImageDetails?.length) {
            for (const sh of req.body.instituteImageDetails) {
                await InstituteImageDetails.create(
                    {
                        institute_image_id: instituteImage.institute_image_id,
                        image_url: sh.image_url,
                        data: sh.data
                    },
                );
            }
        }

        // 18 Institute3DImage
        const institute3DImageRecord = await Institute3DImage.create({});
        if (req.body.Institute3DImageDetails?.length) {
            for (const sh of req.body.Institute3DImageDetails) {
                await Institute3DImageDetails.create({
                    institute_3D_image_id: institute3DImageRecord.institute_3D_image_id,
                    image_url: sh.image_url,
                    data: sh.data
                });
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
                institute_gallery_id: instituteGallery?.institute_gallery_id,
                institute_subject_id: subject?.institute_subject_id,
                eligibility_id: eligibilityDetails?.eligibility_id,
                institute_staff_management_id: staffManagement?.institute_staff_management_id,
                institute_image_id: instituteImage.institute_image_id,
                institute_3D_image_id: institute3DImageRecord?.institute_3D_image_id
            },
        );

        return res.json({
            message: "Institute with all details created successfully",
            data: institute,
        });
    } catch (err) {
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
            distinct: true,
            include: [
                { model: InstituteType, as: "instituteType" },
                {
                    model: InstituteMapping,
                    as: "instituteMapping",
                    include: [
                        {
                            model: InstituteInfrastructure, as: "instituteInfrastructure", include: [{
                                model: InstituteInfrastructureDetails,
                                as: "details",
                                include: [
                                    {
                                        model: InstituteInfrastructureType,
                                        as: "infraType"
                                    }
                                ]
                            }]
                        },
                        { model: InstituteHighlights, as: "instituteHighlights", include: [{ model: InstituteHighlightsDetails, as: "details", separate: true, include: [{ model: InstituteHighlightsType, as: "instituteHighlightsType" }] }] },
                        { model: InstitutePhone, as: "institutePhone", include: [{ model: InstitutePhoneDetails, as: "institutePhoneDetails", separate: true, include: [{ model: InstitutePhoneType, as: "institutePhoneTypes" }] }] },
                        { model: InstituteEmail, as: "instituteEmail", include: [{ model: InstituteEmailDetails, as: "details", separate: true, include: [{ model: InstituteEmailType, as: "emailType" }] }] },
                        { model: InstituteShift, as: "instituteShift", include: [{ model: InstituteShiftDetails, as: "details", separate: true, include: [{ model: InstituteShiftType, as: "instituteShiftType" }] }] },
                        { model: InstituteSocialMedia, as: "instituteSocialMedia", include: [{ model: InstituteSocialMediaDetails, as: "instituteSocialMediaDetails", separate: true, include: [{ model: InstituteSocialMediaType, as: "instituteSocialMediaType" }] }] },
                        { model: InstituteYoutubeLink, as: "instituteYoutubeLink", include: [{ model: InstituteYoutubeLinkDetails, as: "details", separate: true, include: [{ model: InstituteYoutubeLinkType, as: "instituteYoutubeLinkType" }] }] },
                        { model: InstituteSubject, as: "instituteSubject", include: [{ model: SubjectDetails, as: "details", include: [{ model: SubjectType, as: "subjectType" }] }] },
                        { model: InstituteStaffManagement, as: "instituteStaffManagement", include: [{ model: StaffManagement, as: "staffManagement", include: [{ model: QualificationType, as: "qualificationType" }, { model: DesignationType, as: "designationType" }] }] },
                        { model: InstitutePrimaryDetails, as: "institutePrimaryDetails", include: [{ model: InstituteSystemType, as: "instituteSystemType" }, { model: InstituteAffiliateType, as: "instituteAffiliateType" }, { model: InstituteAcademicType, as: "instituteAcademicType" }] },
                        { model: InstituteCampusDetails, as: "campus", include: [{ model: ClassType, as: "classType" }] },
                        { model: InstituteBasicDetails, as: "InstituteBasicDetails" },
                        { model: EligibilityDetails, as: "eligibility" },
                        { model: InstituteLocationsDetails, as: "InstituteLocationsDetails", include: [{ model: StateList, as: "state" }, { model: CityList, as: "city" }, { model: AreaList, as: "area" }] },
                        { model: InstituteImage, as: "instituteImage", include: [{ model: InstituteImageDetails, as: "instituteImageDetail", separate: true }] },
                        { model: Institute3DImage, as: "Institute3DImage", include: [{ model: Institute3DImageDetails, as: "Institute3DImageDetails", separate: true }] },
                        {
                            model: InstituteGallery,
                            as: "instituteGallery",
                            include: [{
                                model: Gallery,
                                as: "gallery",
                                include: [{
                                    model: GalleryDocument,
                                    as: "galleryDocument",
                                    include: [{ model: MediaType, as: "mediaType" }]
                                }]
                            }]
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
                        { model: InstituteInfrastructure, as: "instituteInfrastructure", include: [{ model: InstituteInfrastructureDetails, as: "details", include: [{ model: InstituteInfrastructureType, as: "infraType", }] }] },
                        { model: InstituteHighlights, as: "instituteHighlights", include: [{ model: InstituteHighlightsDetails, as: "details", separate: true, include: [{ model: InstituteHighlightsType, as: "instituteHighlightsType" }] }] },
                        { model: InstitutePhone, as: "institutePhone", include: [{ model: InstitutePhoneDetails, as: "institutePhoneDetails", separate: true, include: [{ model: InstitutePhoneType, as: "institutePhoneTypes" }] }] },
                        { model: InstituteEmail, as: "instituteEmail", include: [{ model: InstituteEmailDetails, as: "details", separate: true, include: [{ model: InstituteEmailType, as: "emailType" }] }] },
                        { model: InstituteShift, as: "instituteShift", include: [{ model: InstituteShiftDetails, as: "details", separate: true, include: [{ model: InstituteShiftType, as: "instituteShiftType" }] }] },
                        { model: InstituteSocialMedia, as: "instituteSocialMedia", include: [{ model: InstituteSocialMediaDetails, as: "instituteSocialMediaDetails", separate: true, include: [{ model: InstituteSocialMediaType, as: "instituteSocialMediaType" }] }] },
                        { model: InstituteYoutubeLink, as: "instituteYoutubeLink", include: [{ model: InstituteYoutubeLinkDetails, as: "details", separate: true, include: [{ model: InstituteYoutubeLinkType, as: "instituteYoutubeLinkType" }] }] },
                        { model: InstituteSubject, as: "instituteSubject", include: [{ model: SubjectDetails, as: "details", include: [{ model: SubjectType, as: "subjectType" }] }] },
                        {
                            model: InstituteStaffManagement,
                            as: "instituteStaffManagement",
                            include: [{
                                model: StaffManagement,
                                as: "staffManagement",
                                // include: [
                                //     { model: QualificationType, as: "qualificationType" },
                                //     { model: DesignationType, as: "designationType" }
                                // ]
                            }]
                        },
                        { model: InstitutePrimaryDetails, as: "institutePrimaryDetails", include: [{ model: InstituteSystemType, as: "instituteSystemType" }, { model: InstituteAffiliateType, as: "instituteAffiliateType" }, { model: InstituteAcademicType, as: "instituteAcademicType" }] },
                        { model: InstituteCampusDetails, as: "campus", include: [{ model: ClassType, as: "classType" }] },
                        { model: InstituteBasicDetails, as: "InstituteBasicDetails" },
                        { model: EligibilityDetails, as: "eligibility" },
                        { model: InstituteLocationsDetails, as: "InstituteLocationsDetails", include: [{ model: StateList, as: "state" }, { model: CityList, as: "city" }, { model: AreaList, as: "area" }] },
                        { model: InstituteImage, as: "instituteImage", include: [{ model: InstituteImageDetails, as: "instituteImageDetail", separate: true }] },
                        { model: Institute3DImage, as: "Institute3DImage", include: [{ model: Institute3DImageDetails, as: "Institute3DImageDetails", separate: true }] },
                        {
                            model: InstituteGallery,
                            as: "instituteGallery",
                            include: [{
                                model: Gallery,
                                as: "gallery",
                                include: [{
                                    model: GalleryDocument,
                                    as: "galleryDocument",
                                    include: [{ model: MediaType, as: "mediaType" }]
                                }]
                            }]
                        }
                    ]
                }],
        });

        if (!institute) return res.status(404).json({ message: "Institute not found" });
        res.json(institute);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateInstitute = async (req, res) => {
    try {
        const instituteId = req.params.id;

        const institute = await Institute.findByPk(instituteId);
        if (!institute) {
            return res.status(404).json({ message: "Institute not found" });
        }

        await institute.update(req.body)
        return res.json({ message: "Institute updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePrimaryDetails = async (req, res) => {
    try {
        const instituteId = req.params.id
        const primary = await InstitutePrimaryDetails.findByPk(instituteId)

        if (!primary) {
            return res.status(404).json({ message: "Institute not found" })
        }
        await primary.update(req.body)
        return res.json({ message: "primary details updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateBasicDetails = async (req, res) => {
    try {
        const instituteId = req.params.id
        const basicDetails = await InstituteBasicDetails.findByPk(instituteId)

        if (!basicDetails) {
            return res.status(404).json({ message: "Institute not found" })
        }
        await basicDetails.update(req.body)
        return res.json({ message: "basic details updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCampusDetails = async (req, res) => {
    try {
        const instituteId = req.params.id
        const cumpusDetails = await InstituteCampusDetails.findByPk(instituteId)

        if (!cumpusDetails) {
            return res.status(404).json({ message: "Institute not found" })
        }
        await cumpusDetails.update(req.body)
        return res.json({ message: "cumpus details updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateLocationDetails = async (req, res) => {
    try {
        const instituteId = req.params.id
        const locationDetails = await InstituteLocationsDetails.findByPk(instituteId)

        if (!locationDetails) {
            return res.status(404).json({ message: "Institute not found" })
        }
        await locationDetails.update(req.body)
        return res.json({ message: "location details updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateEligibilityDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Mapping not found" });
        }

        const existingDetail = await EligibilityDetails.findOne({
            where: { eligibility_id: mapping.eligibility_id }
        });

        if (!existingDetail) {
            return res.status(404).json({ message: "Eligibility details not found" });
        }

        await existingDetail.update(req.body);

        return res.json({
            message: "Eligibility details updated successfully"
        });
    } catch (error) {
        console.error("Error updating eligibility details:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updatePhoneDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { institute_phone_type_id, isvisible } = req.body;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Mapping not found" });
        }

        const phoneType = await InstitutePhoneType.findByPk(institute_phone_type_id);
        if (!phoneType) {
            return res.status(400).json({
                message: `Invalid institute phone type`
            });
        }

        let existingDetail = await InstitutePhoneDetails.findOne({
            where: {
                institute_phone_id: mapping.institute_phone_id,
                institute_phone_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update({ isvisible: isvisible ?? true });
        } else {
            await InstitutePhoneDetails.create({
                institute_phone_id: mapping.institute_phone_id,
                institute_phone_type_id,
                isvisible: isvisible ?? true,
                isdisable: false,
                isdeleted: false
            });
        }

        return res.json({ message: "Phone details updated successfully" });
    } catch (error) {
        console.error("Error updating phone details:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateEmailDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { institute_emails_type_id, isvisible, email } = req.body;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        })
        if (!mapping) {
            return res.status(404).json({ message: "Mapping not found" });
        }

        const emailType = await InstituteEmailType.findByPk(institute_emails_type_id);
        if (!emailType) {
            return res.status(400).json({
                message: `Invalid institute email type`
            });
        }

        let existingDetail = await InstituteEmailDetails.findOne({
            where: {
                institute_email_id: mapping.institute_email_id,
                institute_emails_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update(req.body);
        } else {
            await InstituteEmailDetails.create({
                institute_email_id: mapping.institute_email_id,
                institute_emails_type_id,
                email,
                isvisible: isvisible ?? true,
                isdisable: false,
                isdeleted: false
            });
        }

        return res.json({ message: "email details updated successfully" });
    } catch (error) {
        console.error("Error updating email details:", error);
        res.status(500).json({ error: error.message });
    }
}

export const updateShiftDetails = async (req, res) => {
    try {
        const { id } = req.params
        const { institute_shift_type_id, starting_hours, ending_hours, isvisible } = req.body

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        })

        const shiftType = await InstituteShiftType.findByPk(institute_shift_type_id)
        if (!shiftType) {
            res.status(400).json({ message: "invalid institute shift type" })
        }

        let existingDetail = await InstituteShiftDetails.findOne({
            where: {
                institute_shift_id: mapping.institute_shift_id,
                institute_shift_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update(req.body);
        } else {
            await InstituteEmailDetails.create({
                institute_shift_id: mapping.institute_shift_id,
                institute_shift_type_id,
                starting_hours,
                ending_hours,
                isvisible: isvisible ?? true,
                isdisable: false,
                isdeleted: false
            });
        }
        return res.json({ message: "shift details updated successfully" });
    } catch (error) {
        console.log("Error updateing shift type :", error);
        res.status(500).json({ message: error.message })

    }
}

export const updateHighlightsDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { institute_highlights_type_id, description, isselected } = req.body;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Institute mapping not found" });
        }

        const highlightType = await InstituteHighlightsType.findByPk(institute_highlights_type_id);
        if (!highlightType) {
            return res.status(400).json({ message: "invalid institute highlight type" });
        }

        let existingDetail = await InstituteHighlightsDetails.findOne({
            where: {
                institute_highlight_id: mapping.institute_highlight_id,
                institute_highlights_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update({ description, isselected });
        } else {
            await InstituteHighlightsDetails.create({
                institute_highlight_id: mapping.institute_highlight_id,
                institute_highlights_type_id,
                description,
                isselected: isselected ?? true,
                isdisable: false,
                isdeleted: false
            });
        }

        return res.json({ message: "highlight details updated successfully" });
    } catch (error) {
        console.log("Error updating highlight type", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateSocialMediaDetails = async (req, res) => {
    try {
        const { id } = req.params
        const { institute_social_media_type_id, social_media_url, isvisible } = req.body

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        })

        const socialmediaType = await InstituteSocialMediaType.findByPk(institute_social_media_type_id)
        if (!socialmediaType) {
            res.status(400).json({ message: "invalid institute social media type" })
        }

        let existingDetail = await InstituteSocialMediaDetails.findOne({
            where: {
                institute_social_media_id: mapping.institute_social_media_id,
                institute_social_media_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update(req.body);
        } else {
            await InstituteSocialMediaDetails.create({
                institute_social_media_id: mapping.institute_social_media_id,
                institute_social_media_type_id,
                social_media_url,
                isvisible: isvisible ?? true,
                isdisable: false,
                isdeleted: false
            });
        }
        return res.json({ message: "social media details updated successfully" });
    } catch (error) {
        console.log("Error updateing social media type", error);
        res.status(500).json({ error: error.message })
    }
}

export const updateYoutubeLinkDetails = async (req, res) => {
    try {
        const { id } = req.params
        const { institute_youtube_link_type_id, isvisible } = req.body

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        })

        const youtubeLinkType = await InstituteYoutubeLinkType.findByPk(institute_youtube_link_type_id)
        if (!youtubeLinkType) {
            res.status(400).json({ message: "invalid institute youtube link type" })
        }

        let existingDetail = await InstituteYoutubeLinkDetails.findOne({
            where: {
                institute_youtube_link_id: mapping.institute_youtube_link_id,
                institute_youtube_link_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update(req.body);
        } else {
            await InstituteYoutubeLinkDetails.create({
                institute_youtube_link_id: mapping.institute_youtube_link_id,
                institute_youtube_link_type_id,
                isvisible: isvisible ?? true,
                isdisable: false,
                isdeleted: false
            });
        }
        return res.json({ message: "youtube link details updated successfully" });
    } catch (error) {
        console.log("Error updateing youtube link type", error);
        res.status(500).json({ error: error.message })
    }
}

export const updateSubjectDetails = async (req, res) => {
    try {
        const { id } = req.params
        const { subject_type_id, max_fee, min_fee, no_of_seats, description } = req.body

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        })

        const subjectType = await SubjectType.findByPk(subject_type_id)
        if (!subjectType) {
            res.status(400).json({ message: "invalid institute subject type" })
        }

        let existingDetail = await SubjectDetails.findOne({
            where: {
                institute_subject_id: mapping.institute_subject_id,
                subject_type_id
            }
        });

        if (existingDetail) {
            await existingDetail.update(req.body);
        } else {
            await SubjectDetails.create({
                institute_subject_id: mapping.institute_subject_id,
                subject_type_id,
                max_fee,
                min_fee,
                no_of_seats,
                description,
                isdisable: false,
                isdeleted: false
            });
        }
        return res.json({ message: "subject details updated successfully" });
    } catch (error) {
        console.log("Error updateing subject type", error);
        res.status(500).json({ error: error.message })
    }
}

export const updateStaffManagement = async (req, res) => {
    try {
        const { id } = req.params;
        const { staff_management_id, qualification_type_id, designation_type_id, profile_picture_url, name, total_experience_years, current_experience_years, about } = req.body;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Institute mapping not found" });
        }

        const designationType = await DesignationType.findByPk(designation_type_id);
        if (!designationType) {
            return res.status(400).json({ message: "Invalid designation type" });
        }

        const qualificationType = await QualificationType.findByPk(qualification_type_id);
        if (!qualificationType) {
            return res.status(400).json({ message: "Invalid qualification type" });
        }

        let existingDetail = await StaffManagement.findOne({
            where: {
                institute_staff_management_id: mapping.institute_staff_management_id,
                staff_management_id
            }
        });

        if (existingDetail) {
            await existingDetail.update({
                qualification_type_id,
                designation_type_id,
                profile_picture_url,
                name,
                total_experience_years,
                current_experience_years,
                about
            });
        } else {
            await StaffManagement.create({
                institute_staff_management_id: mapping.institute_staff_management_id,
                qualification_type_id,
                designation_type_id,
                profile_picture_url,
                name,
                total_experience_years,
                current_experience_years,
                about,
                isdisable: false,
                isdeleted: false
            });
        }

        return res.json({ message: "Staff management details updated successfully" });

    } catch (error) {
        console.error("Error updating staff management", error);
        res.status(500).json({ error: error.message });
    }
}

export const updateGalleries = async (req, res) => {
    try {
        const { id } = req.params;
        const { galleries } = req.body;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Institute mapping not found" });
        }

        let instituteGallery = await InstituteGallery.findOne({
            where: { institute_gallery_id: mapping.institute_gallery_id }
        });

        // if (!instituteGallery) {
        //     instituteGallery = await InstituteGallery.create({});
        // }

        // Loop galleries
        for (const g of galleries) {
            let gallery = await Gallery.findOne({
                where: {
                    institute_gallery_id: instituteGallery.institute_gallery_id,
                    gallery_id: g.gallery_id || null
                }
            });

            if (gallery) {
                await gallery.update({ gallery_name: g.gallery_name });
            } else {
                gallery = await Gallery.create({
                    institute_gallery_id: instituteGallery.institute_gallery_id,
                    institute_id: id,
                    gallery_name: g.gallery_name
                });
            }

            // Documents inside this gallery
            if (g.documents?.length) {
                for (const doc of g.documents) {
                    const mediaType = await MediaType.findByPk(doc.media_type_id);
                    if (!mediaType) {
                        return res.status(400).json({ message: "Invalid media type" });
                    }

                    let document = await GalleryDocument.findOne({
                        where: {
                            gallery_id: gallery.gallery_id,
                            gallery_document_id: doc.gallery_document_id || null
                        }
                    });

                    if (document) {
                        await document.update({
                            url: doc.url,
                            media_type_id: doc.media_type_id,
                            data: doc.data
                        });
                    }
                    else {
                        await GalleryDocument.create({
                            gallery_id: gallery.gallery_id,
                            url: doc.url,
                            media_type_id: doc.media_type_id,
                            data: doc.data
                        });
                    }
                }
            }
        }

        return res.json({ message: "Galleries updated successfully" });
    } catch (error) {
        console.error("Error updating galleries:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateImageDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Mapping not found" });
        }

        const existingDetail = await InstituteImageDetails.findOne({
            where: { institute_image_id: mapping.institute_image_id }
        });

        if (!existingDetail) {
            return res.status(404).json({ message: "image details not found" });
        }

        await existingDetail.update(req.body);

        return res.json({
            message: "image details updated successfully"
        });
    } catch (error) {
        console.error("Error updating image details:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateThreedImageDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const mapping = await InstituteMapping.findOne({
            where: { institute_id: id }
        });

        if (!mapping) {
            return res.status(404).json({ message: "Mapping not found" });
        }

        const existingDetail = await Institute3DImageDetails.findOne({
            where: { institute_3D_image_id: mapping.institute_3D_image_id }
        });

        if (!existingDetail) {
            return res.status(404).json({ message: "image details not found" });
        }

        await existingDetail.update(req.body);

        return res.json({
            message: "image details updated successfully"
        });
    } catch (error) {
        console.error("Error updating image details:", error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteInstitute = async (req, res) => {
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
                    await GalleryDocument.destroy({ where: { gallery_id: g.gallery_id } });
                }
                await Gallery.destroy({ where: { institute_id: instituteId } });
                await InstituteGallery.destroy({ where: { institute_gallery_id: mapping.institute_gallery_id } });
            }

            if (mapping.institute_highlight_id) {
                await InstituteHighlightsDetails.destroy({ where: { institute_highlight_id: mapping.institute_highlight_id } });
                await InstituteHighlights.destroy({ where: { institute_highlight_id: mapping.institute_highlight_id } });
            }

            if (mapping.institute_infrastructure_id) {
                await InstituteInfrastructureDetails.destroy({ where: { institute_infrastructure_id: mapping.institute_infrastructure_id } });
                await InstituteInfrastructure.destroy({ where: { institute_infrastructure_id: mapping.institute_infrastructure_id } });
            }

            if (mapping.institute_phone_id) {
                await InstitutePhoneDetails.destroy({ where: { institute_phone_id: mapping.institute_phone_id } });
                await InstitutePhone.destroy({ where: { institute_phone_id: mapping.institute_phone_id } });
            }

            if (mapping.institute_email_id) {
                await InstituteEmailDetails.destroy({ where: { institute_email_id: mapping.institute_email_id } });
                await InstituteEmail.destroy({ where: { institute_email_id: mapping.institute_email_id } });
            }

            if (mapping.institute_shift_id) {
                await InstituteShiftDetails.destroy({ where: { institute_shift_id: mapping.institute_shift_id } });
                await InstituteShift.destroy({ where: { institute_shift_id: mapping.institute_shift_id } });
            }

            if (mapping.institute_social_media_id) {
                await InstituteSocialMediaDetails.destroy({ where: { institute_social_media_id: mapping.institute_social_media_id } });
                await InstituteSocialMedia.destroy({ where: { institute_social_media_id: mapping.institute_social_media_id } });
            }

            if (mapping.institute_youtube_link_id) {
                await InstituteYoutubeLinkDetails.destroy({ where: { institute_youtube_link_id: mapping.institute_youtube_link_id } });
                await InstituteYoutubeLink.destroy({ where: { institute_youtube_link_id: mapping.institute_youtube_link_id } });
            }

            if (mapping.institute_primary_details_id) {
                await InstitutePrimaryDetails.destroy({ where: { institute_primary_details_id: mapping.institute_primary_details_id } });
            }
            if (mapping.institute_campus_id) {
                await InstituteCampusDetails.destroy({ where: { institute_campus_id: mapping.institute_campus_id } });
            }
            if (mapping.institute_basic_details_id) {
                await InstituteBasicDetails.destroy({ where: { institute_basic_details_id: mapping.institute_basic_details_id } });
            }
            if (mapping.institute_location_id) {
                await InstituteLocationsDetails.destroy({ where: { institute_location_id: mapping.institute_location_id } });
            }
            await InstituteMapping.destroy({ where: { institute_id: instituteId } });
        }
        await Institute.destroy({ where: { id: instituteId } });

        return res.json({ message: "Institute and all related data deleted successfully" });

    } catch (error) {
        await t.rollback();
        console.error("Delete error:", error);
        return res.status(500).json({ error: error.message });
    }
};