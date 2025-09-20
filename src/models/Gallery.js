import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const Gallery = sequelize.define("Gallery", {
    gallery_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "gallery_id"
    },
    institute_gallery_id: {
        type: DataTypes.INTEGER,
        field: "ins_gallery_id"
    },
    gallery_name: {
        type: DataTypes.STRING,
        field: "name"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: "ins_id"
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
    tableName: "gallery",
    timestamps: false
});

export default Gallery;