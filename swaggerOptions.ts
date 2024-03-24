import swaggerJsdoc from 'swagger-jsdoc';
import userPaths from './swagger/user.swagger';
import auctionPaths from './swagger/auction.swagger';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auction API',
      version: '1.0.0',
      description: 'API documentation for the Auction system',
    },

    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....', 
          },
        },
      },
    paths: {
      ...userPaths,
      ...auctionPaths,
    },

    servers: [
      {
        url: 'http://localhost:4000', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerJsdoc(options);
