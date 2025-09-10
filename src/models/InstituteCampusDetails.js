import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteCampusDetails = sequelize.define("InstituteCampusDetails", {
    institute_campus_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_id: {
        type: DataTypes.INTEGER
    },
    class_type_id: {
        type: DataTypes.INTEGER
    },
    total_rooms: {
        type: DataTypes.INTEGER
    },
    total_seats: {
        type: DataTypes.INTEGER
    },
    total_floors: {
        type: DataTypes.INTEGER
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
    tableName: "institute_campus_details",
    timestamps: false
})

export default InstituteCampusDetails