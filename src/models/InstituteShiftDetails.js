import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteShiftDetails = sequelize.define("InstituteShiftDetails", {
    institute_shift_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_shift_id: {
        type: DataTypes.INTEGER,
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
    institute_shift_type_id: {
        type: DataTypes.INTEGER,
    },
    starting_hours: {
        type: DataTypes.TIME,
    },
    ending_hours: {
        type: DataTypes.TIME,
    }
}, {
    tableName: "institute_shift_details",
    timestamps: false,
});

export default InstituteShiftDetails;