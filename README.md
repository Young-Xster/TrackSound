# TrackSound

TrackSound is a full-stack music streaming platform built to be a **free alternative to paid music apps**.  
It gives users a place to discover tracks, build playlists, stream music, and download tracks for offline listening.

## Purpose

TrackSound was created to make music access simple and open:

- No subscription barrier for core listening features
- Personal libraries and playlists under your control
- Cross-platform foundation (web-first architecture with room to expand)

## Features

- Account creation and secure sign-in with JWT authentication
- Password update flow with strong password validation
- User profile retrieval and updates
- YouTube-powered track search
- Audio streaming by track/video ID
- Track download support for offline listening
- Playlist creation, editing, track management, and deletion
- Personal track library support

## Tech Stack

### Frontend
- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication

## Project Structure

```text
TrackSound/
├── backend/         # Express API, auth, playlists, tracks, users
├── frontend/        # React web client
├── tracksoun/       # Earlier project workspace/docs
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance (local or hosted)

### 1) Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2) Configure Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BCRYPT_SALT_ROUNDS=10
```

### 3) Run the App

```bash
# Start backend (from backend/)
npm run dev

# Start frontend (from frontend/)
npm run dev
```

Then open the frontend URL shown by Vite (typically `http://localhost:5173`).

## API Overview

Base URL: `http://localhost:5000/api`

- `/auth` – signup, signin, password updates
- `/users` – profile read/update
- `/tracks` – search, stream, download, save track metadata
- `/playlists` – CRUD + playlist track management

## Scripts

### Backend (`backend/package.json`)
- `npm start` – run server
- `npm run dev` – run server with nodemon
- `npm test` – run Jest tests

### Frontend (`frontend/package.json`)
- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build production bundle
- `npm run lint` – run ESLint
- `npm run preview` – preview production build

## Vision

TrackSound aims to deliver the everyday music features people expect—search, streaming, playlists, and offline access—without locking core functionality behind a paywall.

## License

This project is currently distributed for personal learning and development purposes.
