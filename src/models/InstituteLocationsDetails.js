import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteLocationsDetails = sequelize.define("InstituteLocationsDetails", {
    institute_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_id: {
        type: DataTypes.INTEGER,
    },
    state_id: {
        type: DataTypes.INTEGER,
    },
    city_id: {
        type: DataTypes.INTEGER,
    },
    area_id: {
        type: DataTypes.INTEGER,
    },
    address: {
        type: DataTypes.STRING,
    },
    longitude: {
        type: DataTypes.STRING,
    },
    latitude: {
        type: DataTypes.STRING,
    },
    google_map_link: {
        type: DataTypes.STRING,
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
    }
}, {
    tableName: "institute_locations_details",
    timestamps: false,
});

export default InstituteLocationsDetails;