## Overview

This is an authentication-protected Todo App using **Node.js**, **Express.js**, **bcrypt**, **JWT authentication**, and **SQLite**. The app allows users to:

- **Register**: Create a new account.
- **Login**: Authenticate and receive a JWT token.
- **Manage Todos**: Perform auth protected CRUD operations on their own todo tasks after logging in.

## Project Structure

Here’s the corrected and complete project structure diagram for the auth-protected Todo App:

```
backend-todo-app/
│
├── public/
│   └── index.html              # The frontend HTML file for authentication and todo management
│
├── src/
│   ├── controllers/            # (Optional) For future separation of concerns
│   └── middlewares/
│       └── authMiddleware.js    # Middleware for verifying JWT and protecting routes
│   └── routes/
│       └── authRoutes.js        # Routes for user registration and login
│       └── todoRoutes.js        # Routes for authenticated CRUD operations on todos
│   └── db.js                    # SQLite database setup and table creation
│   └── server.js                # Main server entry point that sets up routing and middleware
│
├── .env                         # Environment variables for the project
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Lockfile for exact dependency versions
└── todo-app.rest                # REST client file for emulating API requests
```

This complete structure reflects all important directories and files, allowing for easy navigation of the project.

### Key Directories and Files

- **`public/index.html`**: Frontend HTML for authentication and todo management.
- **`src/middlewares/authMiddleware.js`**: Middleware to protect routes using JWT.
- **`src/routes/authRoutes.js`**: Handles user registration and login.
- **`src/routes/todoRoutes.js`**: Handles CRUD operations for todos, protected by authentication.
- **`src/db.js`**: Initializes SQLite database and creates tables.
- **`src/server.js`**: Sets up the Express server, middleware, and routing.
- **`todo-app.rest`**: REST client file for emulating HTTP requests (registration, login, CRUD).
