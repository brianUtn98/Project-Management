import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  apis: ['./src/**/*.ts', './src/**/components/schemas/*'],
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Projects-Management',
      version: '1.0.0',
      description:
        'API de practica para el taller orientado al desarrollo Web en el Ministerio de Justicia y Derechos Humanos',
    },
  },
};

const swaggerDoc = swaggerJSDoc(options);

export const swaggerServe = swaggerUI.serve;

export const swaggerSetup = swaggerUI.setup(swaggerDoc);
