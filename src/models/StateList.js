import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const StateList = sequelize.define("StateList", {
    state_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "state_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    name: {
        type: DataTypes.STRING,
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
    tableName: "state_list",
    timestamps: false
});

export default StateList;
