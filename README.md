# Job Application Tracker

A full-stack web application that helps users organize and manage their job applications.

Users can add, view, edit, delete, search, filter, and sort job applications while tracking each application's status throughout the job search process.

## Live Demo

Frontend: https://application-tracker-inky.vercel.app

Backend API: https://application-tracker-api-eosin.vercel.app


## Features
- Add new job applications
- View all applications
- Edit existing applications
- Delete applications
- Search applications by company or role
- Filter applications by status
- Sort applications by date or alphabetically
- Track application status: Applied, Interview, Offer, or Rejected
- Dashboard with application statistics and recent applications
- Responsive design for desktop, tablet, and mobile

## Technologies Used

### Frontend
- React
- React Router
- Vite
- Tailwind CSS
- Axios
- React Toastify
- Day.js
- React Icons

### Backend
- Node.js
- Express.js
- PostgreSQL
- node-postgres (pg)
- CORS
- dotenv

### Database & Deployment
- PostgreSQL
- Neon
- Vercel


## Project Architecture

The application follows a full-stack client-server architecture:

React Frontend → Express REST API → PostgreSQL Database

- The React frontend handles the user interface and communicates with the backend using Axios.
- The Express backend provides REST API endpoints for application CRUD operations.
- PostgreSQL stores the job application data.
- Neon hosts the production PostgreSQL database.
- Vercel hosts both the frontend and backend.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications/:id` | Get one application |
| POST | `/api/applications` | Create a new application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |


## Running the Project Locally
### 1. Clone the repository

```bash
git clone https://github.com/abdel1413/ApplicationTracker.git
cd ApplicationTracker
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5001
```

Create a `.env` file inside the `server` folder using `server/.env.example` as a reference.

### 5. Start the backend

From the `server` folder:

```bash
npm run dev
```

### 6. Start the frontend

Open another terminal, return to the project root, and run:

```bash
npm run dev
```

The frontend will run locally on The frontend will run locally on `http://localhost:5173`.