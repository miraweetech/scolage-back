import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const UserInstituteMappings = sequelize.define("UserInstituteMappings", {
    user_institute_mappings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    institute_admin_id: {
        type: DataTypes.INTEGER,
    },
    institute_id: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "user_institute_mappings",
    timestamps: false
})

export default UserInstituteMappings