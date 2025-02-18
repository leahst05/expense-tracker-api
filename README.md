# Overview
This project is a simple REST API built with Node.js and Express. It lets users manage three types of financial data: Users, Expenses, and Income. The API includes endpoints for CRUD operations (Create, Read, Update, Delete) to handle these data types, with Firebase Realtime Database used as the database for storing the information. 

# Technologies Used
- Backend: Node.js, Express
- Database: Firebase (Realtime Database)

# Code Structure
The project is organized into the following directories:
- config/: Contains Firebase configuration and connection setup.
- middlewares/: Contains logic for basic error handling middleware. If an API request fails (e.g., due to a network issue or server error), the application logs the error to the console and may display an error message to the user. Also includes data validation middleware for posting new information to each category.
- routes/: Defines the API endpoints and routes.
- public/: Contains the index.html file, which provides a brief description of the REST API and lists the available endpoints.

# Getting Started
## Prerequisites
- Node.js installed on your machine.
- Firebase project set up and credentials for Realtime Database.
- Postman or similar tool to test API endpoints.

## Installation
- Clone the repository:
Create a folder where you want to clone the project.
Open the terminal and navigate to the directory using the command below:
    ```bash
    cd <name of the directory>

Then, run the following command in the terminal:
    
    git clone https://github.com/leahst05/expense-tracker-api.git
  
- Install dependencies
  ```bash
  npm init
  npm install
  npm install express
  npm install dotenv
  npm install firebase-admin --save

- Set up Port and Firebase credentials:
Create a .env file in the root directory of the project and add the following details. You can obtain the service account JSON file from your Firebase console:
  ```env
  PORT=your_preferred_port_number
  # firebase credentials
  GOOGLE_APPLICATION_CREDENTIALS=service_account.json

- Start the server
  ```bash
  node server.js

# Running the Application
Once the server is running, you can interact with the API using Postman or any HTTP client. Below are the available API endpoints:
## Users Endpoints:
- GET /users - Retrieve all users.
- POST /users - Add a new user.
- PUT /users/:id - Update an existing user by ID.
- DELETE /users/:id - Delete a user by ID.
  
## Expenses Endpoints:
- GET /expenses - Retrieve all expenses.
- POST /expenses - Add a new expense.
- PUT /expenses/:id - Update an existing expense by ID.
- DELETE /expenses/:id - Delete an expense by ID.

## Income Endpoints:
- GET /income - Retrieve all income records.
- POST /income - Add a new income record.
- PUT /income/:id - Update an existing income record by ID.
- DELETE /income/:id - Delete an income record by ID.

# Example Data
Below are examples of the data structure used by the API. Please note that if you do not follow the data structure outlined below when updating or posting data, the API request will fail:

- User Data Example
  ```json
  {
    "name": "Charlie Davis",
    "username": "charlied_92",
    "email": "charlie.davis@example.com",
    "address": {
      "street": "Pine Road",
      "suite": "Unit 5A",
      "city": "Greenfield",
      "zipcode": "67890"
    }
  }

- Expense Data Example
  ```json
  {
    "Savings": {
      "RRSP": 20000,
      "Investment Savings": 12000,
      "Long-term savings": "10000",
      "Bonds": 700,
      "others": 1500
    },
    "Payment Obligations": {
      "credit card": 7000,
      "Loan": 10000,
      "vehicle lease": 400,
      "Line of credit": 2000
    },
    "Insurance": {
      "life insurance": 600,
      "health insurance": 900,
      "others": 500
    },
    "Housing": {
      "Rent": 1200,
      "rent insurance": 600,
      "storage and parking": 800,
      "utilities": 400,
      "maintenance": 250
    },
    "Utilities": {
      "phone": 800,
      "Internet": 500,
      "water": 700,
      "Heat": 250,
      "Electricity": 700,
      "Cable": 350,
      "others": 300
    },
    "Personal": {
      "transportation": 150,
      "clothing": 200,
      "gifts-family": 100,
      "Personal grooming": 400,
      "dining out": 500,
      "Hobbies": 350,
      "others": 150
    }
  }

- Income Data Example
  ```json
  {
      "interest": 350,
      "others": 600,
      "secondary income": 1500,
      "support payment": 120,
      "wages": 8000
  }

# Conclusion
This project provides a simple yet effective REST API for managing users, expenses, and income records. It utilizes Node.js, Express, and Firebase for a robust backend solution. The application is fully functional with support for CRUD operations, secure Firebase credential management using environment variables, and error handling.
