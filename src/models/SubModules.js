import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubModules = sequelize.define("subModules", {
    sub_module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "sub_module_id"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
    },
    title: {
        type: DataTypes.STRING,
        field: "title"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "status"
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
    module_id: {
        type: DataTypes.INTEGER,
        field: "module_id"
    }
}, {
    tableName: "sub_modules",
    timestamps: false
})

export default SubModules;