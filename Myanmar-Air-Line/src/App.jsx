import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingTaskbar from './components/BookingTaskbar';
import BackgroundImageSlider from './components/BackgroundImageSlider';
import Footer from './components/Footer';
import Destinations from './Destinations/Destinations';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate=useNavigate();
  //Path for Background Advertisement BackgroundImage
  const backgroundAdsImages=[
    "/backgroundAds/background1.jpg",
    "/backgroundAds/background2.jpg",
    "/backgroundAds/background3.jpg"
  ];
  const cityPhotos=[
    {cityName: "Yangon", photoUrl: "/Yangon.jpg",key:1},
    {cityName: "Mandalay", photoUrl: "/Mandalay.jpg",key:2},
    {cityName: "Naypyitaw", photoUrl: "/Naypyitaw.jpg",key:3},
    {cityName: "Bago", photoUrl: "/Bago.jpg",key:4},
    {cityName: "Singapore", photoUrl: "/Singapore.jpg",key:5},
    {cityName: "Bangkok", photoUrl: "/Bangkok.jpg",key:6},
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <BackgroundImageSlider images={backgroundAdsImages} />
        <BookingTaskbar element1="Book A Flight" element2="My Booking"  element3="Flight Status"  />
        <div className='mt-10'>
          <h1 className='text-bold text-4xl text-center'>Explore our destinations</h1>
          <div className='w-[50%] mx-auto grid grid-cols-2 gap-2 justify-items-center mt-10 mb-10'>
            {cityPhotos.map(c=><Destinations key={c.key} image={c} className="w-1/2" />)}
          </div>
        </div>
       
        
      </main>
      <Footer />
    </div>
  );

}

export default App;
