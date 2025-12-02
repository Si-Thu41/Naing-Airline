import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchFlightsResult from './SearchFlightsResult.jsx';
import BookFlight from './BookingCompletion/BookFlight.jsx';
import BookingComplete from './BookingCompletion/BookingComplete.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './components/login.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import ErrorPage from './Error.jsx';
import Payment from './BookingCompletion/Payment.jsx';
import City from './Destinations/City.jsx';
import Promotion from './Navigation/Promotion.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<PrivateRoute><App /></PrivateRoute>} />
      <Route path="/searchFlight" element={<PrivateRoute><SearchFlightsResult /></PrivateRoute>} />
      <Route path="/bookFlight" element={<PrivateRoute><BookFlight /></PrivateRoute>} />
      <Route path="/bookingComplete" element={<PrivateRoute><BookingComplete /></PrivateRoute>} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
      <Route path="/destinations" element={<PrivateRoute><City /></PrivateRoute>} />
      <Route path="/promotions" element={<PrivateRoute><Promotion /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>,
)
