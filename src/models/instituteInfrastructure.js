import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteInfrastructure = sequelize.define("InstituteInfrastructure", {
    institute_infrastructure_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ins_infra_id"
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
    tableName: "institute_infrastructure",
    timestamps: false
});

export default InstituteInfrastructure;
