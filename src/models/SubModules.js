import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubModules = sequelize.define("subModules", {
    sub_module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    module_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "sub_modules",
    timestamps: false
})

export default SubModules;