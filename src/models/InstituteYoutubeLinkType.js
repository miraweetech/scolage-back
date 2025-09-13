import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteYoutubeLinkType = sequelize.define("InstituteYoutubeLinkType", {
    institute_youtube_link_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
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
}, {
    tableName: "institute_youtube_link_type",
    timestamps: false
})
export default InstituteYoutubeLinkType