import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteMapping = sequelize.define("InstituteMapping", {
    institute_mapping_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ins_mapping_id"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: "ins_id"
    },
    institute_phone_id: {
        type: DataTypes.INTEGER,
        field: "phone_id"
    },
    institute_email_id: {
        type: DataTypes.INTEGER,
        field: "email_id"
    },
    institute_shift_id: {
        type: DataTypes.INTEGER,
        field: "shift_id"
    },
    institute_infrastructure_id: {
        type: DataTypes.INTEGER,
        field: "ins_infra_id"
    },
    institute_highlight_id: {
        type: DataTypes.INTEGER,
        field: "highlight_id"
    },
    institute_primary_details_id: {
        type: DataTypes.INTEGER,
        field: "primary_detail_id"
    },
    institute_campus_id: {
        type: DataTypes.INTEGER,
        field: "campus_id"
    },
    institute_basic_details_id: {
        type: DataTypes.INTEGER,
        field: "basic_detail_id"
    },
    institute_location_id: {
        type: DataTypes.INTEGER,
        field: "location_id"
    },
    institute_social_media_id: {
        type: DataTypes.INTEGER,
        field: "social-media_id"
    },
    institute_youtube_link_id: {
        type: DataTypes.INTEGER,
        field: "youtube_link_id"
    },
    institute_gallery_id: {
        type: DataTypes.INTEGER,
        field: "ins_gallery_id"
    },
    institute_subject_id: {
        type: DataTypes.INTEGER,
        field: "subject_id"
    },
    institute_staff_management_id: {
        type: DataTypes.INTEGER,
        field: "staff_man_id"
    },
    eligibility_id: {
        type: DataTypes.INTEGER,
        field: "eligibility_id"
    },
    institute_image_id: {
        type: DataTypes.INTEGER,
        field: "image_id"
    },
    institute_3D_image_id: {
        type: DataTypes.INTEGER,
        field: "3D_image_id"
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modified_at"
    },
}, {
    tableName: "institute_mapping",
    timestamps: false
});

export default InstituteMapping;
