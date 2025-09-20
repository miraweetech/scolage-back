import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteYoutubeLink = sequelize.define("InstituteYoutubeLink", {
    institute_youtube_link_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "youtube_link_id"
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
    tableName: "institute_youtube_link",
    timestamps: true
});

export default InstituteYoutubeLink;
