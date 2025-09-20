import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const QualificationType = sequelize.define("QualificationType", {
    qualification_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "qualification_id"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
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
    tableName: "qualification_type",
    timestamps: false
});

export default QualificationType;
