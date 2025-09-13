import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteShift = sequelize.define("InstituteShift", {
    institute_shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    tableName: "institute_shift",
    timestamps: false
});

export default InstituteShift;
