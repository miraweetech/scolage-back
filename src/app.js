import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./configs/connection.js";
import "./models/index.js";
import routers from "./routers/routers.js";
import { errorHandler } from "./middleware/errorHandlerMW.js";
import { swaggerDocs } from "./configs/swagger.js";

dotenv.config();
const app = express();
app.use(express.json());

// Enable CORS
app.use(
  cors({
    methods: "*",
    origin: ["http://192.168.1.23:5173", "http://localhost:5173"],
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);

// Routes
app.use("/v1", routers);
app.use(errorHandler);

// Swagger
swaggerDocs(app);

// Sync Models
sequelize.sync({ force: false }).then(() => {
  console.log("All models synced with DB");
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
