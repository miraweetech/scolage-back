import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteBasicDetails = sequelize.define("InstituteBasicDetails", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_id: {
        type: DataTypes.INTEGER,
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
    slogan: {
        type: DataTypes.STRING
    },
    more_info: {
        type: DataTypes.STRING
    },
}, {
    tableName: "institute_basic_details",
    timestamps: true,
});

export default InstituteBasicDetails;