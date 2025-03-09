# VisionTrackr Backend

This is the backend API for the VisionTrackr application, a platform that helps users define their core values, mission, purpose, and layered visions, as well as set quarterly goals and daily tasks.

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- TypeScript
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/visiontrackr
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user and return JWT token
- `GET /api/auth/me`: Get current user information

### Core Values

- `GET /api/values`: Get user's core values
- `POST /api/values`: Add new core values
- `PUT /api/values/:id`: Update existing core values
- `DELETE /api/values/:id`: Delete core values

### Mission & Purpose

- `GET /api/mission-purpose`: Get user's mission and purpose
- `POST /api/mission-purpose`: Add or update mission and purpose

### Visions

- `GET /api/visions`: Get all visions for the user
- `POST /api/visions`: Add a new vision
- `PUT /api/visions/:id`: Update a vision
- `DELETE /api/visions/:id`: Delete a vision

### Goals

- `GET /api/goals`: Get all goals for the user
- `POST /api/goals`: Add a new goal
- `PUT /api/goals/:id`: Update a goal
- `DELETE /api/goals/:id`: Delete a goal

### Daily Tasks

- `GET /api/tasks`: Get all tasks for the user (optional query param: date)
- `POST /api/tasks`: Add a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

## Build for Production

To build the application for production:

```
npm run build
```

This will compile TypeScript files to JavaScript in the `dist` directory.

To start the production server:

```
npm start
``` 