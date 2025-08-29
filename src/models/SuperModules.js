import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const SuperModules = sequelize.define("SuperModules", {
    super_module_id: {
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
    tableName: "super_modules",
    timestamps: false
})

export default SuperModules;
