import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    emergency_code: {
        type: DataTypes.STRING,
        field: "emergency_code"
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        field: "email"
    },
    mobile: {
        type: DataTypes.STRING,
        field: "mobile"
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_login"
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
    banned_until: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "banned_until"
    }
}, {
    tableName: "users",
    timestamps: false
})

export default User;