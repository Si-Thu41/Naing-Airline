import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SearchFlightsResult from './SearchFlightsResult.jsx';
import BookFlight from './components/BookFlight.jsx';
import { BrowserRouter, Routes, Route } from "react-router";



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/searchFlight" element={<SearchFlightsResult />} />
      <Route path="/bookFlight" element={<BookFlight />} />
    </Routes>
  </BrowserRouter>,
)
