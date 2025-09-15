import { DataTypes } from "sequelize";
import {sequelize} from "../configs/connection.js"

const InstituteImageDetails = sequelize.define('InstituteImageDetails', {
    institute_image_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_image_id: {
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
    tableName: "institute_image_details",
    timestamps: false
})

export default InstituteImageDetails