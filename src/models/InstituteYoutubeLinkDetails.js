import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteYoutubeLinkDetails = sequelize.define("InstituteYoutubeLinkDetails", {
    institute_youtube_link_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_youtube_link_type_id: {
        type: DataTypes.INTEGER,
    },
    institute_youtube_link_id: {
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
    }
}, {
    tableName: "institute_youtube_link_details",
    timestamps: false
})
export default InstituteYoutubeLinkDetails