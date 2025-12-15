# Tracksoun Project

## Overview
Tracksoun is a music streaming application that utilizes YouTube as a source for tracks. It offers features such as user authentication, playlist management, and offline playback functionality. The application is built using a Node.js backend with MongoDB for data storage, and a React frontend for web and React Native for mobile.

## Features
- **User Authentication**: Sign up, login, and token generation for secure access.
- **Track Management**: Search for tracks on YouTube, retrieve track details, and handle downloads.
- **Playlist Management**: Create, update, delete, and retrieve playlists.
- **Offline Playback**: Download tracks and playlists for offline listening.
- **Responsive Design**: Optimized for both web and mobile platforms.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB
- **Frontend Web**: React
- **Frontend Mobile**: React Native

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
3. Start the web application:
   ```
   npm start
   ```

### Frontend Mobile
1. Navigate to the `frontend-mobile` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the mobile application:
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

## Future Enhancements
- Implement user profile customization.
- Add social sharing features for playlists and tracks.
- Enhance search functionality with filters and sorting options.

## License
This project is for personal use and growth.