import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const UserInstituteMappings = sequelize.define("UserInstituteMappings", {
    user_institute_mappings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_ins_map_id"
    },
    user_id: {
        type: DataTypes.INTEGER,
        field: "user_id"
    },
    institute_admin_id: {
        type: DataTypes.INTEGER,
        field: "institute_admin_id"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: "ins_id"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    }
}, {
    tableName: "user_institute_mappings",
    timestamps: false
})

export default UserInstituteMappings