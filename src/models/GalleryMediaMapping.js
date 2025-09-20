import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const GalleryMediaMapping = sequelize.define('GalleryMediaMapping', {
    gallery_media_mapping_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "gallery_mapping_id"
    },
    gallery_id: {
        type: DataTypes.INTEGER,
        field: "gallery_id"
    },
    media_type_id: {
        type: DataTypes.INTEGER,
        field: "media_id"
    }
}, {
    tableName: "gallery_media_mapping",
    timestamps: false
})

export default GalleryMediaMapping