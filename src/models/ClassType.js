import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const ClassType = sequelize.define("ClassType", {
    class_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    idesable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    tableName: "class_type",
    timestamps: false
})

export default ClassType;
