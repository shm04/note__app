# Notes Application

## Overview
This project is a full-stack application designed to manage personal notes. The application allows users to create, edit, archive, and delete notes. The frontend is built with React, and the backend is powered by NestJS using a PostgreSQL database. The app is structured as a Single Page Application (SPA) and includes a responsive design.

## Project Structure
- **Frontend:** React
- **Backend:** NestJS with JavaScript (not TypeScript)
- **Database:** PostgreSQL
- **ORM:** TypeORM

## Prerequisites
Ensure you have the following tools installed on your system:

### General Requirements
- **Node.js:** v18.17.0
- **npm:** v9.5.1
- **Git:** v2.39.2
- **PostgreSQL:** v15.2
- **Bash/Zsh:** Required for running the provided setup script

### Frontend
- **React:** v18.2.0
- **react-dom:** v18.2.0
- **react-scripts:** v5.0.1

### Backend
- **NestJS:** v9.0.0
- **TypeORM:** v0.3.12
- **pg:** v8.8.0
- **dotenv:** v16.3.1

## Setup and Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/notes-app.git
    cd notes-app
    ```

2. **Install Dependencies**
    Navigate to the frontend and backend directories and install the required packages.

    **Frontend**
    ```bash
    cd frontend
    npm install
    ```

    **Backend**
    ```bash
    cd backend
    npm install
    ```

3. **Set Up Environment Variables**
    Create a `.env` file in the backend directory and provide the necessary environment variables:

    ```env
    # .env
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USERNAME=your_db_username
    DATABASE_PASSWORD=your_db_password
    DATABASE_NAME=notes_db
    ```

4. **Initialize the Database**
    Run the following command to set up the database schema and run the necessary migrations:

    ```bash
    npx typeorm migration:run -d src/data-source.js
    ```

5. **Run the Application**
    Navigate to the root directory and execute the provided setup script to start the application:

    ```bash
    ./start.sh
    ```
    This script will:
    - Set up the PostgreSQL database.
    - Run migrations.
    - Start the backend and frontend servers.

6. **Access the Application**
    Once the servers are running, you can access the application by navigating to:

    ```arduino
    http://localhost:3000
    ```

## Scripts

### Backend Scripts
- `npm run start` - Start the backend server.
- `npm run start:dev` - Start the backend server in development mode.
- `npm run db:init` - Set up the database schema and run migrations.
- `npm run db:migrate` - Generate and run migrations.

### Frontend Scripts
- `npm start` - Start the frontend development server.

## Testing
Unit testing are not available yet.

## Contributing
------------
- Please fork this repository and contribute back using pull requests. Any contributions, issues, and feature requests are welcome.

## License
-------
This project is licensed under the MIT License.

## Contact
-------
For any questions or feedback, please reach out to your.email@example.com.
