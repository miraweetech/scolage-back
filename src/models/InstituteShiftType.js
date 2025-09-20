import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteShiftType = sequelize.define("InstituteShiftType", {
    institute_shift_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "shift_type_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    },
    idesable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
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
    starting_day: {
        type: DataTypes.INTEGER,
        field: "starting_day"
    },
    ending_day: {
        type: DataTypes.INTEGER,
        field: "ending_day"
    }
}, {
    tableName: "institute_shift_types",
    timestamps: false
})

export default InstituteShiftType
