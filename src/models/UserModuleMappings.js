import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const UserModuleMappings = sequelize.define("UserModuleMappings", {
    user_module_mappings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_module_map_id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        field: "user_id"
    },
    module_id: {
        type: DataTypes.INTEGER,
        field: "module_id"
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_deleted"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    }
}, {
    tableName: "user_module_mappings",
    timestamps: false
})

export default UserModuleMappings