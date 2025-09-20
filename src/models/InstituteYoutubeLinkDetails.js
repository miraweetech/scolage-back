import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteYoutubeLinkDetails = sequelize.define("InstituteYoutubeLinkDetails", {
    institute_youtube_link_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "youtube_link_detail_id"
    },
    institute_youtube_link_type_id: {
        type: DataTypes.INTEGER,
        field: "youtube_link_type_id"
    },
    institute_youtube_link_id: {
        type: DataTypes.INTEGER,
        field: "youtube_link_id"
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
    isvisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "isvisible"
    }
}, {
    tableName: "institute_youtube_link_details",
    timestamps: false
})
export default InstituteYoutubeLinkDetails