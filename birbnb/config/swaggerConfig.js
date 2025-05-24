import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Birbnb',
      version: '1.0.0',
      description: 'Documentación con Swagger',
    },
  },
  apis: ['birbnb/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

function setSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setSwagger };
