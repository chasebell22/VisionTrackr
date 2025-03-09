# VisionTracker

VisionTracker is a full-stack web application that helps users define their core values, mission, purpose, and layered visions (10-year, 3-year, 1-year), as well as set quarterly goals and daily tasks. It features progress tracking, gamification, and a modern, bold design targeting young men.

## Project Overview

This application is built with a modern tech stack:

- **Backend**: Node.js with Express, MongoDB, TypeScript, and JWT authentication
- **Frontend**: React with TypeScript, Tailwind CSS, and Chart.js

## Features

- **User Authentication**: Secure registration and login
- **Core Values**: Define and manage personal core values
- **Mission & Purpose**: Set personal mission and purpose statements
- **Layered Visions**: Create and track 10-year, 3-year, and 1-year visions
- **Quarterly Goals**: Set and track progress on quarterly goals
- **Daily Tasks**: Manage daily tasks linked to goals
- **Progress Tracking**: Visual representation of progress with charts
- **Responsive Design**: Mobile-friendly interface

## Project Structure

The project is organized into two main directories:

- `/backend`: Express API with MongoDB
- `/frontend`: React application with TypeScript

Each directory has its own README with specific setup instructions.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/visiontracker
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

See the backend README for detailed API documentation.

## License

This project is licensed under the MIT License. 