# Geo-Location Manager

A comprehensive MERN stack application that allows users to save and manage different location types using Google Maps integration. This application provides an intuitive interface for users to mark and categorize locations while leveraging device geolocation capabilities.

## Features

- **User Authentication**: Secure register and login functionality. Protected routes for authenticated users. JWT-based authentication system
- **Location Services**: Real-time device location detection. Interactive Google Maps integration. Current location visualization. Location permission handling.
- **Location Management**:Save locations with custom categories: Home, Office, and Family & Friends. Add notes/descriptions to saved locations. View saved locations on map. Update and delete saved locations.

- **Device Location:**: Automatic device location detection. Location access permission handling. Location accuracy optimization.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern, fast build tool for JavaScript and CSS.
- **Material UI**: A library of CSS framework for rapidly building custom designs.
- **Backend**: Node.js, Express.js, MongoDB for database, and JWT for authentication.
- **APIs & Services**: Google Maps API, Geolocation API, and Browser Location Services.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js installed on your machine. If you don't have Node.js installed, you can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Ajoy-paul11/Geo-Location.git
   ```
2. Navigate to the project
   ```sh
   cd Geo-Location
   ```
3. Navigate to the backend directory
   ```sh
   cd backend
   ```
4. Install NPM package
   ```sh
   npm install
   ```
5. Run backend development server
   ```sh
   npm run start
   ```
6. Back to the root directory and then, Navigate to the frontend directory
   ```sh
   cd frontend
   ```
7. Install NPM package
   ```sh
   npm install
   ```
8. Run the frontend development server
   ```sh
   npm run dev
   ```

## Setup Environment variable

- MONGODB_URI=your_mongodb_connection_string

- JWT_SECRET=your_jwt_secret_key
  PORT=5000

## Frontend (.env):

- VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

## Usage

### User Registration/Login:

- Create a new account or login with existing credentials.
- Complete authentication to access location features

### Location Permission

- Grant location access when prompted.
- Enable device location services.

### Saving Location

- Click on the map or use current location
- Select location type (Home/Office/Family & Friends)
- Add description (optional)
- Save location

### Managing Locations

- View all saved locations on the map
- Edit location details
- Remove saved locations

## API End Points

Base URL: `/api/v1/users`

- `POST /register`: Add a new user
- `POST /login`: Login of the user
- `POST /logout`: Logout the user

Base URL: `/api/v1/addresses`

- `POST /create`: Add a new location
- `GET /`: Retrieve all locations
- `PUT /update`: Update the specific location
- `DELETE /:id`: Delete a location

## Contact

<p align="left"> <a href="https://twitter.com/ajoy_paul11" target="blank"><img src="https://img.shields.io/twitter/follow/ajoy_paul11?logo=twitter&style=for-the-badge" alt="ajoy_paul11" /></a> </p>

<a href="https://linkedin.com/in/ajoypaul" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="ajoypaul" height="30" width="40" /></a>
