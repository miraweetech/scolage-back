import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const InstituteType = sequelize.define("InstituteType", {
    institute_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    tableName: "institute_types",
    timestamps: false
})

export default InstituteType