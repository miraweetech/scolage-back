import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const EligibilityDetails = sequelize.define("EligibilityDetails", {
    eligibility_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    eligibility_criteria: {
        type: DataTypes.STRING
    },
    fee_terms: {
        type: DataTypes.STRING
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
}, {
    tableName: "eligibility_details",
    timestamps: false
});

export default EligibilityDetails;
