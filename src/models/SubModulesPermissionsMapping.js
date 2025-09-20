import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SubModulesPermissionsMapping = sequelize.define("SubModulesPermissionsMapping", {
    sub_modules_permissions_mapping_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "sub_module_per_map_id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        field: "user_id"
    },
    module_id: {
        type: DataTypes.INTEGER,
        field: "module_id"
    },
    sub_module_id: {
        type: DataTypes.INTEGER,
        field: "sub_module_id"
    },
    permission_type_id: {
        type: DataTypes.INTEGER,
        field: "permission_type_id"
    }
}, {
    tableName: "sub_modules_permissions_mapping",
    timestamps: false
})

export default SubModulesPermissionsMapping;