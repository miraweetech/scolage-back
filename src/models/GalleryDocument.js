import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const GalleryDocument = sequelize.define("GalleryDocument", {
    gallery_document_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gallery_id: {
        type: DataTypes.INTEGER,
    },
    url: {
        type: DataTypes.STRING
    },
    media_type_id: {
        type: DataTypes.INTEGER
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
    tableName: "gallery_document",
    timestamps: false
});

export default GalleryDocument;