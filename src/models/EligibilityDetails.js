import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const EligibilityDetails = sequelize.define("EligibilityDetails", {
    eligibility_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "eligibility_id"
    },
    eligibility_criteria: {
        type: DataTypes.STRING,
        field: "criteria"
    },
    fee_terms: {
        type: DataTypes.STRING,
        field: "terms"
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
    tableName: "eligibility_details",
    timestamps: false
});

export default EligibilityDetails;
