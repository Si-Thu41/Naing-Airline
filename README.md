# Online Flight Ticket Booking System

A full-stack web application for booking flight tickets online. Users can search for flights, view flight details, book tickets, and manage their bookings with a seamless user experience.

---

## Features

- User Authentication: Google OAuth 2.0 integration with session management
- Flight Search: Search flights by departure city, arrival city, and date
- Flight Details: View detailed information about flights including duration, pricing, and availability
- Booking System: Multi-passenger booking with traveler information forms
- Passenger Management: Save passenger information during booking process
- Booking History: View and track all user bookings
- Responsive Design: Mobile-friendly UI built with Tailwind CSS
- Payment Integration: Ready for payment processing

---

## Tech Stack

### Frontend
- React - UI library
- React Router - Client-side routing
- Tailwind CSS - Styling
- Vite - Build tool
- Material-UI Icons - Icon library

### Backend
- Node.js - Runtime environment
- Express.js - Web framework
- PostgreSQL - Database
- Passport.js - Authentication
- Express-session - Session management
- CORS - Cross-origin resource sharing

### Authentication
- Google OAuth 2.0 - Social login
- Passport Google Strategy - OAuth implementation

---

## Project Structure

```
Online_FlightTicket/
├── Myanmar-Air-Line/                 # Frontend (React)
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── BookingCompletion/       # Booking flow components
│   │   ├── Traveler/                # Traveler management
│   │   ├── Functions/               # Utility functions
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── public/                       # Static assets
│   └── package.json
│
└── mainBackend/                      # Backend (Node.js/Express)
    ├── controllers.js               # Route handlers
    ├── router.js                    # API routes
    ├── server.js                    # Express server setup
    ├── package.json
    └── .env                         # Environment variables
```

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Google OAuth credentials

### Backend Setup

1. Navigate to the backend directory:
```bash
cd mainBackend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=3000
HOST=localhost
USER=your_database_username
PASSWORD=your_database_password
DATABASE=your_database_name
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

4. Start the backend:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Myanmar-Air-Line
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.

---

## API Endpoints

### Authentication
- `GET /auth/google` - Initiate Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /logout` - Logout user
- `GET /checkAuth` - Check if user is authenticated

### Flights
- `GET /api/cities` - Get all cities
- `GET /api/searchFlight` - Search flights by route and date
- `GET /api/searchFlightById` - Get flight details by ID

### Bookings
- `POST /api/confirmBooking` - Create a new booking
- `GET /api/seeBookings` - Get user's bookings
- `GET /api/getFlightStatus` - Get flight status

---

## Usage

1. **Register/Login**: Click "Continue with Google" to authenticate
2. **Search Flights**: Enter departure city, arrival city, date, and passenger count
3. **View Details**: Click on a flight to see more information
4. **Book Flight**: Select travel class and proceed to booking
5. **Enter Passenger Info**: Fill in details for each passenger
6. **Complete Booking**: Review and confirm your booking
7. **View Bookings**: Access your booking history from the dashboard

---

## Database Schema

### Key Tables
- `users` - User accounts
- `flights` - Flight information
- `cities` - City/airport data
- `bookings` - Booking records
- `passengers` - Passenger information per booking

---

## Security Notes

- Session cookies are HTTP-only and secure
- CORS is configured to allow only the frontend origin
- Authentication is required for protected routes
- Sensitive data (secrets, credentials) stored in `.env`

---

## Troubleshooting

### Session not persisting
1. Ensure CORS is configured with `credentials: true`
2. Verify `credentials: "include"` is set on all frontend fetch requests
3. Check browser cookie settings

### Port conflicts
1. Backend runs on port 3000, frontend on 5173
2. Change ports in `.env` (backend) or `vite.config.js` (frontend) if needed

### Database connection errors
1. Verify PostgreSQL is running
2. Check environment variables in `.env`
3. Ensure database exists and credentials are correct

---

## Support

For issues or questions, please open an issue in the repository.