import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteBasicDetails = sequelize.define("InstituteBasicDetails", {
    institute_basic_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "basic_detail_id"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: 'ins_id'
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
    slogan: {
        type: DataTypes.STRING,
        field: "slogan"
    },
    more_info: {
        type: DataTypes.STRING,
        field: "more_info"
    },
}, {
    tableName: "institute_basic_details",
    timestamps: false,
});

export default InstituteBasicDetails;