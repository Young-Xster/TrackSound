# Tracksoun Web Application

## Overview
Tracksoun is a web application that allows users to search for tracks on YouTube, create and manage playlists, and listen to music offline. The application is built using a Node.js backend with MongoDB for data storage and a React frontend for user interaction.

## Features
- User authentication (sign up, login)
- Search for tracks using YouTube API
- Create, update, and delete playlists
- Offline playback of downloaded tracks
- Audio playback controls (play, pause, skip, rewind)

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React
- **Authentication**: OAuth2
- **Audio Playback**: HTML5 Audio API

## Project Structure
```
tracksoun
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   ├── package.json
│   └── .env
├── frontend-web
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── frontend-mobile
│   ├── src
│   ├── package.json
│   ├── babel.config.js
│   └── metro.config.js
└── README.md
```

## Installation Instructions
### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB connection string and any other necessary environment variables.
4. Start the server:
   ```
   npm start
   ```

### Frontend Web
1. Navigate to the `frontend-web` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Frontend Mobile
1. Navigate to the `frontend-mobile` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the mobile application (ensure you have the necessary environment set up for React Native):
   ```
   npm start
   ```

## MongoDB Installation on Linux
1. Update your package index:
   ```
   sudo apt update
   ```
2. Install MongoDB:
   ```
   sudo apt install -y mongodb
   ```
3. Start the MongoDB service:
   ```
   sudo systemctl start mongodb
   ```
4. Enable MongoDB to start on boot:
   ```
   sudo systemctl enable mongodb
   ```
5. Verify that MongoDB is running:
   ```
   sudo systemctl status mongodb
   ```
6. Access the MongoDB shell:
   ```
   mongo
   ```

## Contribution
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and suggestions are welcome!

## License
This project is for personal use and growth.