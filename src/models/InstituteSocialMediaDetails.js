import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteSocialMediaDetails = sequelize.define("InstituteSocialMediaDetails", {
    institute_social_media_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_social_media_type_id: {
        type: DataTypes.INTEGER,
    },
    institute_social_media_id: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isvisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    social_media_url: {
        type: DataTypes.STRING
    }
}, {
    tableName: "institute_social_media_details",
    timestamps: false
})
export default InstituteSocialMediaDetails