import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteInfrastructureType = sequelize.define("InstituteInfrastructureType", {
    infra_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    icon_link: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "institute_infrastructure_type",
    timestamps: false
})
export default InstituteInfrastructureType