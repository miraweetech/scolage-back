import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const InstituteModules = sequelize.define("InstituteModules", {
    institute_module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    module_name: {
        type: DataTypes.STRING
    },
    path: {
        type: DataTypes.STRING
    },
    module_id: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: "institute_modules",
    timestamps: false
})

export default InstituteModules;