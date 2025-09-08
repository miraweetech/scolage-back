import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const StateList = sequelize.define("StateList", {
    state_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.STRING,
    },
    name : {
        type: DataTypes.STRING
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
    tableName: "state_list",
    timestamps: false
});

export default StateList;
