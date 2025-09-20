import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteLocationsDetails = sequelize.define("InstituteLocationsDetails", {
    institute_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "location_id"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: "ins_id"
    },
    state_id: {
        type: DataTypes.INTEGER,
        field: "state_ia"
    },
    city_id: {
        type: DataTypes.INTEGER,
        field: "city_id"
    },
    area_id: {
        type: DataTypes.INTEGER,
        field: "area_id"
    },
    address: {
        type: DataTypes.STRING,
        field: "address"
    },
    longitude: {
        type: DataTypes.STRING,
        field: "longitude"
    },
    latitude: {
        type: DataTypes.STRING,
        field: "latitude"
    },
    google_map_link: {
        type: DataTypes.STRING,
        field: "map_link"
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
    }
}, {
    tableName: "institute_locations_details",
    timestamps: false,
});

export default InstituteLocationsDetails;