# CareHire Server

This is the backend server for the CareHire application, built with Node.js, Express, and MySQL (via Sequelize).

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server

## Setup

1.  **Install Dependencies:**
    ```bash
    cd server
    npm install
    ```

2.  **Database Configuration:**
    - Create a MySQL database named `carehire_db` (or whatever you prefer).
    - Update the `.env` file with your database credentials:
      ```env
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=your_password
      DB_NAME=carehire_db
      JWT_SECRET=your_secure_secret
      ```

3.  **Run the Server:**
    - Development mode (with nodemon):
      ```bash
      npm run dev
      ```
    - Production mode:
      ```bash
      npm start
      ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user profile (Protected)

### Jobs
- `GET /api/jobs` - List all jobs (Supports query params: `scope`, `type`, `search`)
- `POST /api/jobs` - Post a new job (Recruiter/Admin only)
- `GET /api/jobs/:id` - Get job details

### Posts (Feed)
- `GET /api/posts` - Get the main feed
- `POST /api/posts` - Create a post (Protected)
- `POST /api/posts/:id/like` - Like a post

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile (Protected)
