import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { HomeCarouselData } from './HomeCarouselData';

const MainCarousel = () => {
    const items = HomeCarouselData.map((item) =><img src={item.image} className='cursor-pointer' 
    role='presentation' alt=''/>)

    return (
        <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
        />
    )
};

export default MainCarousel;