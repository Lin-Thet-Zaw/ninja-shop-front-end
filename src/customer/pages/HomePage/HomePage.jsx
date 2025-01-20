import React from 'react'
import MainCarousel from '../../componenets/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../componenets/HomeSectionCarousel/HomeSectionCarousel'

function HomePage() {
  return (
    <div>
        <MainCarousel />
        <div className='space-y-10 py-20 flex flex-col'>
            <HomeSectionCarousel sectionName={"Man Shoes"}/>
            <HomeSectionCarousel sectionName={"Man Wear"}/>
            <HomeSectionCarousel sectionName={"Man Shirt"}/>
        </div>
    </div>
  )
}

export default HomePage