import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const AreaList = sequelize.define("AreaList", {
    area_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    }
}, {
    tableName: "area_list",
    timestamps: false
});

export default AreaList;
