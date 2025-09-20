import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteInfrastructureType = sequelize.define("InstituteInfrastructureType", {
    infra_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "infra_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
    },
    icon_link: {
        type: DataTypes.STRING,
        field: "icon_link"
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
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    }
}, {
    tableName: "institute_infrastructure_type",
    timestamps: false
})
export default InstituteInfrastructureType