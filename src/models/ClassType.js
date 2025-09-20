import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const ClassType = sequelize.define("ClassType", {
    class_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "class_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    title: {
        type: DataTypes.STRING,
        field: "title"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
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
    tableName: "class_type",
    timestamps: false
})

export default ClassType;
