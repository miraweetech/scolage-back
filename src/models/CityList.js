import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const CityList = sequelize.define("CityList", {
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    place_id: {
        type: DataTypes.STRING,
        // allowNull: true
    }
}, {
    tableName: "city_list",
    timestamps: false
});

export default CityList;
