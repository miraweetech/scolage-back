import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";



const PermissionType = sequelize.define("PermissionType", {
    permission_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.ENUM(["write", "read"])
    },
    can_edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: "permission_types",
    timestamps: false
})

export default PermissionType;