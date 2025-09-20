import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubjectType = sequelize.define("SubjectType", {
    subject_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "sub_type_id"
    },
    subject: {
        type: DataTypes.STRING,
        field: "subject"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
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
    tableName: "subject_type",
    timestamps: false
});

export default SubjectType;
