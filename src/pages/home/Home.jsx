import React from 'react';
import HeroSlider from './HeroSlider';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import Brands from './Brands';
import Reviews from './Reviews';

const reviewsPromise = fetch("/reviews.json").then(res => res.json());
const Home = () => {
    return (
        <div>
            <HeroSlider/>
            <HowItWorks/>
            <OurServices/>
            <Brands/>
            <Reviews reviewsPromise={reviewsPromise}/>
        </div>
    );
};

export default Home;