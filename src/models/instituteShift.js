import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteShift = sequelize.define("InstituteShift", {
    institute_shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "shift_id"
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
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
}, {
    tableName: "institute_shift",
    timestamps: false
});

export default InstituteShift;
