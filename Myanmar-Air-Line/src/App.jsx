import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingTaskbar from './components/BookingTaskbar';
import BackgroundImageSlider from './components/BackgroundImageSlider';
import Footer from './components/Footer';
import Destinations from './components/Destinations';

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
        <div className='mt-10'>
          <h1 className='text-bold text-4xl text-center'>Explore our destinations</h1>
          <div className='w-[50%] mx-auto grid grid-cols-2 gap-2 justify-items-center mt-10 mb-10'>
            <Destinations image={cityPhotos[0]} className="order-1 w-1/2 " />
            <Destinations image={cityPhotos[1]} className="order-2 w-1/2" />
            <Destinations image={cityPhotos[2]} className="order-3 w-1/2" />
            <Destinations image={cityPhotos[3]} className="order-4 w-1/2" />
          </div>
        </div>
       
        
      </main>
      <Footer />
    </div>
  );

}

export default App;
