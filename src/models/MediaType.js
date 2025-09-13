import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const MediaType = sequelize.define("MediaType", {
    media_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    mime_type: {
        type: DataTypes.STRING
    },
    extension: {
        type: DataTypes.STRING
    },
    is_prohibited: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    tableName: "media_type",
    timestamps: false
});

export default MediaType;