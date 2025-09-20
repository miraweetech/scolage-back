import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubjectDetails = sequelize.define("SubjectDetails", {
    subject_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "subject_detail_id"
    },
    subject_type_id: {
        type: DataTypes.INTEGER,
        field: "sub_type_id"
    },
    institute_subject_id: {
        type: DataTypes.INTEGER,
        field: "subject_id"
    },
    description: {
        type: DataTypes.STRING,
        field: "description"
    },
    max_fee: {
        type: DataTypes.DECIMAL,
        field: "max_fee"
    },
    min_fee: {
        type: DataTypes.DECIMAL,
        field: "min_fee"
    },
    no_of_seats: {
        type: DataTypes.INTEGER,
        field: "seats"
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
    tableName: "subject_details",
    timestamps: false
});

export default SubjectDetails;
