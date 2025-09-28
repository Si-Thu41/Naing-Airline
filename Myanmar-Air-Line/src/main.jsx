import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchFlightsResult from './SearchFlightsResult.jsx';
import BookFlight from './components/BookFlight.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './components/login.jsx';
import PrivateRoute from './PrivateRoute.jsx';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/loggedin" element={<PrivateRoute><App /></PrivateRoute>} />
      <Route path="/searchFlight" element={<PrivateRoute><SearchFlightsResult /></PrivateRoute>} />
      <Route path="/bookFlight" element={<PrivateRoute><BookFlight /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>,
)
