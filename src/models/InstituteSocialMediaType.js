import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteSocialMediaType = sequelize.define("InstituteSocialMediaType", {
    institute_social_media_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.STRING
    },
    rejex: {
        type: DataTypes.STRING
    },
    icon_link: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    idesable: {
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
    tableName: "institute_social_media_type",
    timestamps: false
})

export default InstituteSocialMediaType
