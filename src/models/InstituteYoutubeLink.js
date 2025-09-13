import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteYoutubeLink = sequelize.define("InstituteYoutubeLink", {
    institute_youtube_link_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    tableName: "institute_youtube_link",
    timestamps: true
});

export default InstituteYoutubeLink;
