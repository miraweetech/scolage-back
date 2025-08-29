import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const SubModulesPermissionsMapping = sequelize.define("SubModulesPermissionsMapping", {
    sub_modules_permissions_mapping_id: {
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
    sub_module_permissions_id: {
        type: DataTypes.INTEGER,
    },
    permission_type_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "sub_modules_permissions_mapping",
    timestamps: false
})

export default SubModulesPermissionsMapping;