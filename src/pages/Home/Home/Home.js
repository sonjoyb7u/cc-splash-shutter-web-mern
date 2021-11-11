import React from 'react';
import { Box } from '@mui/system';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Header/Navigation/Navigation';
import CustomerReview from '../CustomerReview/CustomerReview';
import HelpService from '../HelpService/HelpService';
import Products from '../Products/Products';
import Slider from '../Slider/Slider';
import SpecialOffer from '../SpecialOffer/SpecialOffer';
import Subscriber from '../Subscriber/Subscriber';

const Home = () => {
    
    return (
        <Box>
            <Navigation></Navigation>
            <Slider></Slider>
            <SpecialOffer></SpecialOffer>
            <HelpService></HelpService>
            <Products></Products>
            <CustomerReview></CustomerReview>
            <Subscriber></Subscriber>
            <Footer></Footer>
        </Box>
    );
};

export default Home;