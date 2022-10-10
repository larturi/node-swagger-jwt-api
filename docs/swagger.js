const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "API Music",
    description: "Esta documentación de api de genera automaticamente",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  schemes: ["http"],
  components: {
    securitySchemes: {
      BasicAuth: {
        type: "http",
        scheme: "basic",
      },
    },
  },
  security: {
    BasicAuth: []
  }
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;