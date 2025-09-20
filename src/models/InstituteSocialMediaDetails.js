import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteSocialMediaDetails = sequelize.define("InstituteSocialMediaDetails", {
    institute_social_media_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "social_media_detail_id"
    },
    institute_social_media_type_id: {
        type: DataTypes.INTEGER,
        field: "social_media_type_id"
    },
    institute_social_media_id: {
        type: DataTypes.INTEGER,
        field: "social_media_id"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_At"
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modified_at"
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
    isvisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "isvisible"
    },
    social_media_url: {
        type: DataTypes.STRING,
        field: "url"
    }
}, {
    tableName: "institute_social_media_details",
    timestamps: false
})
export default InstituteSocialMediaDetails