import { userSchema } from "./userSchema"; // Import the schema

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express application",
    },
    components: {
      ...userSchema.components, // Add the user schema to components
    },
  },
  apis: ["./src/routes/*.ts"], // Your route files
};
