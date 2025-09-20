import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const Institute = sequelize.define("Institute", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    institute_type_id: {
        type: DataTypes.INTEGER,
        field: "ins_type_id"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_at"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "status"
    },
    varified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "varified"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active"
    },
    place_id: {
        type: DataTypes.INTEGER,
        field: "place_id"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },
}, {
    tableName: "institutes",
    timestamps: false
})

export default Institute