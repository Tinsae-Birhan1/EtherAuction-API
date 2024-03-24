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
    paths: {
      ...userPaths,
      ...auctionPaths,
    },
    tags: [
      {
        name: 'User Authentication',
        description: 'Endpoints related to user authentication',
        paths: {
            ...userPaths,
          },
      },
      {
        name: 'Auction',
        description: 'Endpoints related to auctions',
        paths: {
      ...userPaths,
      ...auctionPaths,
    },
      },
    ],
    servers: [
      {
        url: 'http://localhost:4000', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export default swaggerJsdoc(options);
