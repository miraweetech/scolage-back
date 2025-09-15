import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubjectType = sequelize.define("SubjectType", {
    subject_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject: {
        type: DataTypes.STRING
    },
    created_by: {
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
    tableName: "subject_type",
    timestamps: false
});

export default SubjectType;
