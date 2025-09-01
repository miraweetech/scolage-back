import { DataTypes } from "sequelize";
import { sequelize } from "../dbs/connection.js";

const Collages= sequelize.define("Collages", {
    collage_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdisable: {
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
    },
    institute_type_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "collages",
    timestamps: false
})

export default Collages