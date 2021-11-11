import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import serviceOfferImgOne  from './../../../assets/images/special-offers/special_offer_1.png';
import serviceOfferImgTwo from './../../../assets/images/special-offers/special_offer_2.png';
import serviceOfferImgThree  from './../../../assets/images/special-offers/special_offer_3.png';
import { NavLink } from 'react-router-dom';
import './SpecialOffer.css'


const SpecialOffer = () => {
    return (
        <Container sx={{ mt: 8 }}>
            <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={12} sm={12} md={3} lg={3} className="image-hover-effect-zoom">
                    <NavLink to="/">
                        <img style={{ width: "100%", borderRadius: "10px" }} src={serviceOfferImgOne} alt="Special Offer Icon" /> 
                    </NavLink>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} className="image-hover-effect-zoom">
                    <NavLink to="/">
                        <img style={{ width: "100%", borderRadius: "10px" }} src={serviceOfferImgTwo} alt="Special Offer Icon" /> 
                    </NavLink>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} className="image-hover-effect-zoom">
                    <NavLink to="/">
                        <img style={{ width: "100%", borderRadius: "10px" }} src={serviceOfferImgThree} alt="Special Offer Icon" /> 
                    </NavLink>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SpecialOffer;