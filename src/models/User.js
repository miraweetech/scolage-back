import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emergency_code: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    mobile: {
        type: DataTypes.STRING
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    banned_until: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "users",
    timestamps: false
})

export default User;