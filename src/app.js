import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./dbs/connection.js";
import "./models/index.js" 
import userRoutes from "./routers/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/v1", userRoutes);

// Sync Models (Auto-create tables)
sequelize.sync({ force: false }).then(() => {
    console.log("✅ All models synced with DB");
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
})