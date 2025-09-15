import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteMapping = sequelize.define("InstituteMapping", {
    institute_mapping_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_id: {
        type: DataTypes.INTEGER
    },
    institute_phone_id: {
        type: DataTypes.INTEGER,
    },
    institute_email_id: {
        type: DataTypes.INTEGER,
    },
    institute_shift_id: {
        type: DataTypes.INTEGER,
    },
    institute_infrastructure_id: {
        type: DataTypes.INTEGER,
    },
    institute_highlight_id: {
        type: DataTypes.INTEGER,
    },
    institute_primary_details_id: {
        type: DataTypes.INTEGER
    },
    institute_campus_id: {
        type: DataTypes.INTEGER,
    },
    institute_basic_details_id: {
        type: DataTypes.INTEGER,
    },
    institute_location_id: {
        type: DataTypes.INTEGER,
    },
    institute_social_media_id: {
        type: DataTypes.INTEGER
    },
    institute_youtube_link_id: {
        type: DataTypes.INTEGER
    },
    institute_gallery_id: {
        type: DataTypes.INTEGER
    },
    institute_subject_id: {
        type: DataTypes.INTEGER
    },
    institute_staff_management_id: {
        type: DataTypes.INTEGER
    },
    eligibility_id: {
        type: DataTypes.INTEGER
    },
    institute_image_id: {
        type: DataTypes.INTEGER
    },
    institute_threed_image_id: {
        type: DataTypes.INTEGER
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: "institute_mapping",
    timestamps: false
});

export default InstituteMapping;
