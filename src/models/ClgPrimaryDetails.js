import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const ClgPrimaryDetails = sequelize.define("ClgPrimaryDetails", {
    clg_primary_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    clg_profile_image_link: {
        type: DataTypes.STRING
    },
    clg_type: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    system_type: {
        type: DataTypes.INTEGER
    },
    academic_type: {
        type: DataTypes.INTEGER
    },
    affiliate_type: {
        type: DataTypes.INTEGER
    },
    collage_code: {
        type: DataTypes.INTEGER
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    domain_name: {
        type: DataTypes.STRING
    },
    tld: {
        type: DataTypes.STRING
    }
}, {
    tableName: "clg_primary_details",
    timestamps: false
})

export default ClgPrimaryDetails