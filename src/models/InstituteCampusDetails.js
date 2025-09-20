import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteCampusDetails = sequelize.define("InstituteCampusDetails", {
    institute_campus_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "campus_id"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: "ins_id"
    },
    class_type_id: {
        type: DataTypes.INTEGER,
        field: "class_id"
    },
    total_rooms: {
        type: DataTypes.INTEGER,
        field: "room"
    },
    total_seats: {
        type: DataTypes.INTEGER,
        field: "seats"
    },
    collage_area: {
        type: DataTypes.DECIMAL,
        field: "clg_area"
    },
    total_floors: {
        type: DataTypes.INTEGER,
        field: "floors"
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
    tableName: "institute_campus_details",
    timestamps: false
})

export default InstituteCampusDetails