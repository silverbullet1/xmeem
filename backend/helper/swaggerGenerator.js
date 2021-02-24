
const swaggerAutogen = require('swagger-autogen')()
const swaggerJsdoc = require("swagger-jsdoc");
const outputFile = './swaggerDocument.json'
const endpointsFiles = ['./../service/memes']
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "XMeme API with Swagger",
        version: "1.0.0",
        description:
          "This is a simple Get/Create/Update API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Shivam",
          email: "shivamk4r@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8081/memes",
        },
      ],
    },
    apis: ["./../service/memes.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
