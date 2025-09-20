import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js"

const InstituteImageDetails = sequelize.define('InstituteImageDetails', {
    institute_image_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "img_detail_id"
    },
    institute_image_id: {
        type: DataTypes.INTEGER,
        field: "image_id"
    },
    image_url: {
        type: DataTypes.STRING,
        field: "url"
    },
    data: {
        type: DataTypes.JSON,
        field: "data"
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
    }
}, {
    tableName: "institute_image_details",
    timestamps: false
})

export default InstituteImageDetails