import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteInfrastructureDetails = sequelize.define("InstituteInfrastructureDetails", {
    institute_infra_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_id: {
        type: DataTypes.INTEGER,
    },
    infra_id: {
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
    isselected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "institute_infrastructure_details",
    timestamps: false,
})

export default InstituteInfrastructureDetails;