# Blog Application

This is a full-stack blog application built using React with Vite for the frontend, Node.js for the backend, and MySQL as the database. The application uses react-quill as the text editor for seamless blog formatting.

## Features

- Create, read, update, and delete blog posts.
- Rich text editing using react-quill.
- Responsive design for various devices.
- RESTful API for managing blog posts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine.
- MySQL installed and running.
- Git installed on your machine.

## Installation

Follow these steps to set up the project locally.

### Frontend

1. Clone the frontend repository:
    ```sh
    git clone https://github.com/krish3957/blog-client
    ```

2. Navigate to the project directory:
    ```sh
    cd blog-client
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

### Backend

1. Clone the backend repository:
    ```sh
    git clone https://github.com/krish3957/blog-api
    ```

2. Navigate to the project directory:
    ```sh
    cd blog-api
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Set up the database:

    - Create a MySQL database:
      ```sql
      CREATE DATABASE blog;
      ```

    - Import the provided database schema and seed data (if any).

    - Update the `.env` file with your database credentials:
      ```env
      PASS_SEC = 8360
      JWT_SEC = 8360
      ```

## Running the Application

### Frontend

1. Start the development server:
    ```sh
    npm run dev
    ```

2. Open your browser and go to `http://localhost:3000`.

### Backend

1. Start the backend server:
    ```sh
    npm start
    ```

2. The backend server will run on `http://localhost:5000` by default.

## Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links to Repositories

- [Frontend Repository](https://github.com/krish3957/blog-client)
- [Backend Repository](https://github.com/krish3957/blog-api)

