import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteModules = sequelize.define("InstituteModules", {
    institute_module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ins_module_id"
    },
    module_name: {
        type: DataTypes.STRING,
        // unique: true,
        field: "name"
    },
    path: {
        type: DataTypes.STRING,
        unique: true,
        field :"path"
    },
    module_id: {
        type: DataTypes.INTEGER,
        field :"module_id"
    }
}, {
    tableName: "institute_modules",
    timestamps: false
})

export default InstituteModules;