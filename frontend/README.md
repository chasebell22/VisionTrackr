# VisionTrackr Frontend

This is the frontend application for VisionTrackr, a platform that helps users define their core values, mission, purpose, and layered visions, as well as set quarterly goals and daily tasks.

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- Chart.js for data visualization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend API running (see backend README)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Features

- **Authentication**: User registration and login
- **Core Values**: Define and manage your core values
- **Mission & Purpose**: Set your personal mission and purpose
- **Visions**: Create layered visions (10-year, 3-year, 1-year)
- **Goals**: Set and track quarterly goals
- **Daily Tasks**: Manage daily tasks linked to your goals
- **Dashboard**: Visualize your progress with charts and statistics

## Project Structure

- `/src/components`: Reusable UI components
  - `/layout`: Layout components (Header, Sidebar)
  - `/auth`: Authentication components (Login, Register)
  - `/ui`: Common UI components
- `/src/pages`: Page components
- `/src/context`: React Context for state management
- `/src/services`: API service functions

## Build for Production

To build the application for production:

```
npm run build
```

This will create a `dist` directory with the compiled assets.

## Design

The application features a bold, modern design with vibrant colors targeting young men. The UI is fully responsive and works well on mobile devices. 