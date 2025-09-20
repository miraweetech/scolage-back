import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePrimaryDetails = sequelize.define("InstitutePrimaryDetails", {
    institute_primary_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "primary_detail_id"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
    },
    clg_profile_image_link: {
        type: DataTypes.STRING,
        field: "img_profile_url"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "cteated_at"
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modified_at"
    },
    syatem_type_id: {
        type: DataTypes.INTEGER,
        field: "system_id"
    },
    academic_type_id: {
        type: DataTypes.INTEGER,
        field: "academic_id"
    },
    affiliate_type_id: {
        type: DataTypes.INTEGER,
        field: "affiliate_id"
    },
    collage_code: {
        type: DataTypes.INTEGER,
        field: "clg_code"
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
    domain_name: {
        type: DataTypes.STRING,
        field: "domain"
    },
    tld: {
        type: DataTypes.STRING,
        field: "tld"
    },
    institute_id: {
        type: DataTypes.INTEGER,
        field: "ins_id"
    }
}, {
    tableName: "institute_primary_details",
    timestamps: false,
})

export default InstitutePrimaryDetails;