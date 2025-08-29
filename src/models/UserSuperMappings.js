import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const UserSuperMappings = sequelize.define("UserSuperMappings", {
    user_super_mappings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    super_admin_id: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active"
    },
}, {
    tableName: "user_super_mappings",
    timestamps: false
});

export default UserSuperMappings;