import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteInfrastructureDetails = sequelize.define("InstituteInfrastructureDetails", {
    institute_infra_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "institute_infra_id"
    },
    institute_infrastructure_id: {
        type: DataTypes.INTEGER,
        field: "ins_infra_id"
    },
    infra_id: {
        type: DataTypes.INTEGER,
        field: "infra_ia"
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
    isselected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "isselected"
    }
}, {
    tableName: "institute_infrastructure_details",
    timestamps: false,
})

export default InstituteInfrastructureDetails;