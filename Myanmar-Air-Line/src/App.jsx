import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingTaskbar from './components/BookingTaskbar';
import BackgroundImageSlider from './components/BackgroundImageSlider';
import Footer from './components/Footer';

function App() {

  //Path for Background Advertisement BackgroundImage
  const backgroundAdsImages=[
    "/backgroundAds/background1.jpg",
    "/backgroundAds/background2.jpg",
    "/backgroundAds/background3.jpg"
  ];
  const cityPhotos=[
    {cityName: "Yangon", photoUrl: "/Yangon.jpg"},
    {cityName: "Mandalay", photoUrl: "/Mandalay.jpg"},
    {cityName: "Naypyitaw", photoUrl: "/Naypyitaw.jpg"},
    {cityName: "Bago", photoUrl: "/Bago.jpg"},];

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <BackgroundImageSlider images={backgroundAdsImages} />
        <BookingTaskbar element1="Book A Flight" element2="My Booking" element3="MHupgrade" element4="Check-in" element5="Flight Status" element6="Flight Schedule" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
