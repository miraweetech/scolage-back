import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubjectDetails = sequelize.define("SubjectDetails", {
    subject_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject_type_id: {
        type: DataTypes.INTEGER
    },
    institute_subject_id: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    max_fee: {
        type: DataTypes.DECIMAL
    },
    min_fee: {
        type: DataTypes.DECIMAL
    },
    no_of_seats: {
        type: DataTypes.INTEGER
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
    tableName: "subject_details",
    timestamps: false
});

export default SubjectDetails;
