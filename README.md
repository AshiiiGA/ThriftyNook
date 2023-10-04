# Project ThriftyNook

This README provides instructions on how to set up and run the project.

## Table of Contents

- [Project Setup](#project-setup)
- [Configuration Setup](#configuration-setup)
- [Start the Application](#start-the-application)

## Project Setup

Follow these steps to set up the project:

1. **Clone the repository to your local machine:**
```sh
   git clone https://github.com/AshiiiGA/ThriftyNook.git
```
2. **Navigate to the project directory:**
```sh
   cd ThriftyNook
   ```

3. **Install the required Node.js modules using npm. Run the following command to install the necessary dependencies**
```sh
   npm install
   ```

## Configuration Setup

4. **Create a .env file in the project directory to store your configuration variables. You will need to define the following variables in the .env file**

DATABASE_URL: Replace this with the correct database connection string
PORT: Set the port number where the application will run

Here's an example .env file:
```sh
   DATABASE_URL=mongodb://localhost/mydatabase
   PORT=3000
```

## Start the Application

5. **Start the application using npm:**
This command will start the server, and you can access the application by opening your web browser and navigating to http://localhost:3000 (or the port you specified in the .env file).
```sh
   npm start
```

