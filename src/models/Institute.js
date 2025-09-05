import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const Institute = sequelize.define("Institute", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_type_id: {
        type: DataTypes.INTEGER,
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    varified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    place_id: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: "institutes",
    timestamps: false
})

export default Institute