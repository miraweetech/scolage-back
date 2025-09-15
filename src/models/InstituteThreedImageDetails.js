import { DataTypes } from "sequelize";
import {sequelize} from "../configs/connection.js"

const InstituteThreedImageDetails = sequelize.define('InstituteThreedImageDetails', {
    institute_threed_image_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_threed_image_id: {
        type: DataTypes.INTEGER
    },
    image_url: {
        type: DataTypes.STRING
    },
    data: {
        type: DataTypes.JSON
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "institute_threed_image_details",
    timestamps: false
})

export default InstituteThreedImageDetails