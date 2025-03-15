# Book Search Engine

Deployed App: https://book-search-engine-mlb.onrender.com

## Description

This project is a Book Search Engine that allows users to search for books using the Google Books API. It is built using the MERN stack (MongoDB, Express.js, React, Node.js) and has been refactored to use a GraphQL API via Apollo Server.

Users can:

- Search for books by title, author, or description.
- Save books to their account.
- View and remove saved books from their account.

## Features

- **Search Books**: Search for books using the Google Books API.
- **Save Books**: Save books to the user's account.
- **View Saved Books**: View a list of saved books.
- **Remove Saved Books**: Remove books from the saved list.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-search-engine.git
2. Install dependencies:
  Navigate to the project folder and install the necessary dependencies for both the front-end and back-end.
   ```bash
      cd book-search-engine
     npm install
     cd client
     npm install
3. Set up environment variables:
  Create a .env file in the root directory and add your environment variables for MongoDB and any other services.
   ```bash
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
4. Run the application:
   In the project root directory, start both the server and the client:
   ```bash
   npm start
   cd client
   npm start
5. Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign in or create an account.
3. Search for books by title, author, or description.
4. Save books to your account by clicking "Save".
5. View or remove saved books from your profile.

## Technologies Used

- **MERN Stack**: MongoDB, Express.js, React, Node.js
- **Apollo Server**: For building the GraphQL API
- **JWT**: For user authentication
- **Google Books API**: For searching books
- **GraphQL**: For querying and mutating book data
- **Babel**: For transpiling ES6+ JavaScript
- **Webpack**: For bundling JavaScript files
- **Node.js**: For the back-end server
- **MongoDB**: For the database


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.









