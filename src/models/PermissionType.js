import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const PermissionType = sequelize.define("PermissionType", {
    permission_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "permission_type_id"
    },
    title: {
        type: DataTypes.ENUM(["write", "read"]),
        field: "title"
    },
    can_edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "can_edit"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
    },
}, {
    tableName: "permission_types",
    timestamps: false
})

export default PermissionType;