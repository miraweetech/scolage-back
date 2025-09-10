import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scolage API Documentation",
      version: "1.0.0",
      description: "REST API documentation for the Scolage application",
    },
    servers: [
      {
        url: "http://localhost:7000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    path.join(__dirname, "../apis/*.js"),
    path.join(__dirname, "../routers/*.js"),
  ],
};

export function swaggerDocs(app) {
  const swaggerSpec = swaggerJsdoc(config);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger docs available at http://localhost:7000/api-docs");
}
