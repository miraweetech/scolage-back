import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePhoneDetails = sequelize.define("InstitutePhoneDetails", {
    institute_phone_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone_type: {
        type: DataTypes.STRING,
    },
    institute_id: {
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
    tableName: "institute_phone_details",
    timestamps: false
})
export default InstitutePhoneDetails