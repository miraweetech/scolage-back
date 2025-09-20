import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteYoutubeLinkType = sequelize.define("InstituteYoutubeLinkType", {
    institute_youtube_link_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "youtube_link_type_id"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
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
}, {
    tableName: "institute_youtube_link_type",
    timestamps: false
})
export default InstituteYoutubeLinkType