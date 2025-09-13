import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const Gallery = sequelize.define("Gallery", {
    gallery_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_gallery_id: {
        type: DataTypes.INTEGER,
    },
    gallery_name: {
        type: DataTypes.STRING
    },
    institute_id: {
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
    tableName: "gallery",
    timestamps: false
});

export default Gallery;