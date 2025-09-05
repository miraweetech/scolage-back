import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./configs/connection.js";
import "./models/index.js" 
import routers from "./routers/routers.js";
import { errorHandler } from "./middleware/errorHandlerMW.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/v1', routers)
app.use(errorHandler)

// Sync Models (Auto-create tables)
sequelize.sync({ force: false }).then(() => {
    console.log("All models synced with DB");
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})