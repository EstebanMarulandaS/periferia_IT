import swaggerJSDoc from "swagger-jsdoc";

export function buildSwaggerSpec(serviceName: string, port: number) {
  return swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: `${serviceName} API`,
        version: "1.0.0"
      },
      servers: [{ url: `http://localhost:${port}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
    },
    apis: ["./src/routes/*.ts"]
  });
}
