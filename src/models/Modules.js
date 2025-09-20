import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const Modules = sequelize.define("Modules", {
    module_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "module_id"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
    },
    is_super: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_super"
    },
    is_institute: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_ins"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "status"
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
    as_submodule: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "as_submodule"
    }
}, {
    tableName: "modules",
    timestamps: false
});

export default Modules;