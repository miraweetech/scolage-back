import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SuperModules = sequelize.define("SuperModules", {
    super_module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "super_module_id"
    },
    module_name: {
        type: DataTypes.STRING,
        // unique: true,
        field: "name"
    },
    path: {
        type: DataTypes.STRING,
        unique: true,
        field: "path"
    },
    module_id: {
        type: DataTypes.INTEGER,
        field: "module_id"
    }
}, {
    tableName: "super_modules",
    timestamps: false
})

export default SuperModules;
