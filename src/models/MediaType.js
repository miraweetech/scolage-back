import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const MediaType = sequelize.define("MediaType", {
    media_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "media_id"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
    },
    mime_type: {
        type: DataTypes.STRING,
        field: "mime_type"
    },
    extension: {
        type: DataTypes.STRING,
        field: "extension"
    },
    is_prohibited: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "prohibited"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modified_at"
    },
}, {
    tableName: "media_type",
    timestamps: false
});

export default MediaType;