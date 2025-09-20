import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteSocialMediaType = sequelize.define("InstituteSocialMediaType", {
    institute_social_media_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "social_media_type_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    rejex: {
        type: DataTypes.STRING,
        field: "rejex"
    },
    icon_link: {
        type: DataTypes.STRING,
        field: "icon_link"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
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
    tableName: "institute_social_media_type",
    timestamps: false
})

export default InstituteSocialMediaType
