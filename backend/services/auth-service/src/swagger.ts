import swaggerJSDoc from "swagger-jsdoc";

export function buildSwaggerSpec(serviceName: string, port: number) {
  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: `${serviceName} API`,
        version: "1.0.0"
      },
      servers: [
        { url: `http://localhost:${port}` }
      ]
    },
    apis: ["./src/routes/*.ts"]
  };

  return swaggerJSDoc(options);
}
