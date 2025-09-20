import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const AreaList = sequelize.define("AreaList", {
    area_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "area_id",
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "city_id"
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "state_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name"
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
    is_new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_new"
    },
    place_id: {
        type: DataTypes.STRING,
        // allowNull: true,
        field: "place_id"
    }
}, {
    tableName: "area_list",
    timestamps: false
});

export default AreaList;
