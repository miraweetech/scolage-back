import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePhoneDetails = sequelize.define("InstitutePhoneDetails", {
    institute_phone_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "phone_detail_id"
    },
    institute_phone_type_id: {
        type: DataTypes.INTEGER,
        field: "phone_type_id"
    },
    institute_phone_id: {
        type: DataTypes.INTEGER,
        field: "phone_id"
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
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    },
    isvisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "isvisible"
    }
}, {
    tableName: "institute_phone_details",
    timestamps: false
})
export default InstitutePhoneDetails