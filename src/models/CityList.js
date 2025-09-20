import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const CityList = sequelize.define("CityList", {
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    tableName: "city_list",
    timestamps: false
});

export default CityList;
