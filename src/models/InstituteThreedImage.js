import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteThreedImage = sequelize.define("InstituteThreedImage", {
    institute_threed_image_id: {
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
    tableName: "institute_threed_image",
    timestamps: false
});

export default InstituteThreedImage;
