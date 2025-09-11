import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePrimaryDetails = sequelize.define("InstitutePrimaryDetails", {  
    institute_primary_details_id: {
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
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    institute_system_type_id: {
        type: DataTypes.INTEGER
    },
    institute_academic_type_id: {
        type: DataTypes.INTEGER
    },
    institute_affiliate_type_id: {
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
    domain_name:{
        type: DataTypes.STRING
    },
    tld: {
        type: DataTypes.STRING
    },
    institute_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "institute_primary_details",
    timestamps: true,
})

export default InstitutePrimaryDetails;