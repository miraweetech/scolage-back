import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

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
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "user_module_mappings",
    timestamps: false
})

// UserModuleMappings.belongsTo(sequelize.models.Modules, { foreignKey: "module_id", as: "module" });

export default UserModuleMappings