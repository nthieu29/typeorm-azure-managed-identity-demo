# ExpressJS with TypeORM and Azure Managed Identity

## Description

This project is an ExpressJS application that utilizes TypeORM for data management and Azure Managed Identity for
secure, credential-less access to Azure SQL Database. The application demonstrates how to manage a User entity with
basic CRUD operations using an architecture that leverages best practices for security and maintainability.

## Features

- **ExpressJS**: Web framework for Node.js.
- **TypeORM**: Object-relational mapping to interact with the database.
- **Azure Managed Identity**: Secure access to Azure SQL Database without explicit credentials.

## Prerequisites

- Node.js and npm installed.
- Access to an Azure SQL Database.
- Azure App Service configured with Managed Identity enabled and access rights to the SQL Database. Please refer
  to [Tutorial: Connect to Azure databases from App Service without secrets using a managed identity](https://learn.microsoft.com/en-us/azure/app-service/tutorial-connect-msi-azure-database).

## Installation

To get started with this project, clone the repository and install the necessary dependencies.

    # Clone the repository
    git clone <your-repository-url>
    cd <repository-folder>

    # Install dependencies
    npm install

## Configuration

Ensure the following environment variables are set in your environment, or in a `.env` file in the root of your project:

    AZURE_SQL_SERVER=<Your Azure SQL Server>
    AZURE_SQL_DATABASE=<Your Database Name>
    PORT=<Your Preferred Port, default is 3000>

## Running the Application

To run the application, use the following command:

    npm start

This command will start the server on the designated port, and you can access the API at `http://localhost:<PORT>`,
where `<PORT>` is the port number you configured.

## API Endpoints

- **GET /users**: Fetch all users.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update an existing user.
- **DELETE /users/:id**: Delete a user.
