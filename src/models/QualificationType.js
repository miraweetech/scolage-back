import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const QualificationType = sequelize.define("QualificationType", {
    qualification_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
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
    tableName: "qualification_type",
    timestamps: false
});

export default QualificationType;
