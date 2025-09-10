import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteShiftType = sequelize.define("InstituteShiftType", {
    institute_shift_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.STRING
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    },
    idesable: {
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
    starting_day: {
        type: DataTypes.INTEGER
    },
    ending_day: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "institute_shift_types",
    timestamps: false
})

export default InstituteShiftType
