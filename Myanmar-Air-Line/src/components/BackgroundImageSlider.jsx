import React from 'react';

function BackgroundImageSlider({images}) {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const imgs=images;
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => prevIndex===imgs.length-1 ? 0 : prevIndex + 1);
        }, 4000);
        return () => clearInterval(interval); // Only runs on unmount i.e when component is removed from the DOM, so that there is no lapping intervals
    }, [imgs.length]);
  return (
    <div className={`w-full lg:h-[350px] sm:h-[200px] overflow-hidden relative bg-no-repeat bg-center z-10 relative`} style={{ backgroundImage: `url(${imgs[currentImageIndex]})` }}>
      
    </div>
  );
}

export default BackgroundImageSlider;