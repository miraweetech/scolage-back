import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteShiftDetails = sequelize.define("InstituteShiftDetails", {
    institute_shift_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "shift_detail_id"
    },
    institute_shift_id: {
        type: DataTypes.INTEGER,
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
    institute_shift_type_id: {
        type: DataTypes.INTEGER,
        field: "shift_type_id"
    },
    starting_hours: {
        type: DataTypes.TIME,
        field: "starting_hours"
    },
    ending_hours: {
        type: DataTypes.TIME,
        field: "ending_hours"
    }
}, {
    tableName: "institute_shift_details",
    timestamps: false,
});

export default InstituteShiftDetails;