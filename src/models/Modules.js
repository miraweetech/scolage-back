import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const Modules = sequelize.define("Modules", {
    module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
    is_super: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_institute: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: "modules",
    timestamps: false
});

export default Modules;