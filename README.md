# Auction API Backend

This repository contains the backend service for interacting with an auction smart contract deployed on the Ethereum blockchain. The service provides RESTful APIs for managing and querying data related to a single auction contract. Users are required to authenticate using JSON Web Tokens (JWT) to access the APIs.

## Installation

### Prerequisites

- Node.js and npm installed on your machine
- Docker and Docker Compose (optional)

### Installation Steps

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Tinsae-Birhan1/EtherAuction-API
```

2. Navigate to the project directory:

```bash
cd EtherAuction-API
```

3. Install dependencies using one of the following methods:

#### Using Docker Compose (Recommended)

Run the following command to start the application using Docker Compose:

```bash
docker-compose up
```

This command will build the Docker image and start the containers for the application.

#### Using npm and Nodemon

Alternatively, you can install dependencies using npm and run the application with Nodemon for live code reloading:

```bash
npm install
npm start
```

This command will install dependencies and start the application. Nodemon will monitor changes to your files and automatically restart the server.

## API Documentation

The API documentation is generated using Swagger and can be accessed at `/api-docs` endpoint after starting the server.

## Usage

Once the application is running, you can use the following endpoints to interact with the auction contract:

- **User Authentication**: Register, login, and logout to obtain JWT tokens.
- **Auction Operations**: Retrieve auction status, auction history, submit a bid, and view statistics.
- Deploy a new auction smart contract with parameters and Dockerize the setup.

## Testing

To run tests, execute the following command:

```bash
npm test
```

This will run both unit and integration tests for the application.
