import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteEmailDetails = sequelize.define("InstituteEmailDetails", {
    institute_emails_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "email_detail_id"
    },
    institute_email_id: {
        type: DataTypes.INTEGER,
        field: "email_id"
    },
    institute_emails_type_id: {
        type: DataTypes.INTEGER,
        field: "email_type_id"
    },
    email: {
        type: DataTypes.STRING,
        field: "email"
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
    tableName: "institute_email_details",
    timestamps: false
})

export default InstituteEmailDetails