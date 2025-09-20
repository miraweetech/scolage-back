import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const UserSuperMappings = sequelize.define("UserSuperMappings", {
    user_super_mappings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_super_map_id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        field: "user_id"
    },
    super_admin_id: {
        type: DataTypes.INTEGER,
        field: "super_admin_id"
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
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active"
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        field: "status"
    },
}, {
    tableName: "user_super_mappings",
    timestamps: false
});

export default UserSuperMappings;