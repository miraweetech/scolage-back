import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js"

const Institute3DImageDetails = sequelize.define('Institute3DImageDetails', {
    institute_3D_image_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "3D_img_detail_id"
    },
    institute_3D_image_id: {
        type: DataTypes.INTEGER,
        field: "3D_image_id"
    },
    image_url: {
        type: DataTypes.STRING,
        field: "image_url"
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
    tableName: "institute_3D_image_details",
    timestamps: false
})

export default Institute3DImageDetails