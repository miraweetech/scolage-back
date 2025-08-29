import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const UserModuleMappings = sequelize.define("UserModuleMappings", {
    user_module_mappings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    module_id: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "user_module_mappings",
    timestamps: false
})

export default UserModuleMappings