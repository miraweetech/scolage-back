import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteType = sequelize.define("InstituteType", {
    institute_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ins_type_id"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
    },
    title: {
        type: DataTypes.STRING,
        field: "title"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "status"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is-active"
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
    tableName: "institute_types",
    timestamps: false
})

export default InstituteType