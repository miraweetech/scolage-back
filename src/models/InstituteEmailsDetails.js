import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteEmailDetails = sequelize.define("InstituteEmailDetails", {
    institute_emails_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_email_id: {
        type: DataTypes.INTEGER,
    },
    institute_emails_type_id: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
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
    tableName: "institute_email_details",
    timestamps: false
})

export default InstituteEmailDetails