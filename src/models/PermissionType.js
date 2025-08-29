import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const PermissionType = sequelize.define("PermissionType", {
    permission_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
    },
    can_edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: "permission_types",
    timestamps: false
})

export default PermissionType;