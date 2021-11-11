import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import MuiButton from '../../../StyledComponent/MuiButton';
import { SliderImages } from '../../RawStaticData/RawStaticData';
import './Slider.css';

const verticalCenter = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
}

const Slider = () => {

    // Start Slider process ...
    const [current, setCurrent] = useState(0);
    const length = SliderImages.length;
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    // console.log(current);
    if(!Array.isArray(SliderImages) || length <=0 ) {
        return null;
    }
    // End Slider process...


    return (
        <Container >
            <Box sx={{ minHeight: "80vh", background: "linear-gradient( 280deg, #FF6FD8 10%, #3813C2 100%)" }}>
                <Container sx={{ flexGrow: 1 }}>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={5} style={{ ...verticalCenter }}>
                            <Box sx={{ textAlign: "left", ml: 2 }}>
                                <Typography variant="h5" sx={{ textTransform: "uppercase", color: "#C04848", fontWeight: 600, mb: 1 }}>
                                    security first<span style={{ color: "#fff" }}>,</span>
                                </Typography>
                                <Typography variant="h3" sx={{ textTransform: "capitalize", color: "#fff", fontWeight: 600, fontSize: "40px", mb: 3 }}>
                                    We are the best seller
                                <br />
                                <span style={{ color: "#fff", fontSize: "30px"}}>starting at ... $20</span>
                                </Typography>
                                <Typography variant="p" sx={{ textTransform: "capitalize", color: "#fff", fontWeight: 400 }}>
                                    Your security matters we give you best solution & solved it very smoothly.
                                </Typography>
                                <div>
                                    <MuiButton variant="contained">
                                        Shop Now
                                    </MuiButton>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} style={ verticalCenter }>
                            <Box>
                                <ArrowBackIosOutlinedIcon sx={{ position: "absolute", top: "50%", left: "25px", fontSize: "30px", color: "#fff", zIndex: "10", cursor: "pointer" }} onClick={prevSlide}/>
                                <ArrowForwardIosOutlinedIcon sx={{ position: "absolute", top: "50%", right: "25px", zIndex: "10", fontSize: "30px", color: "#fff", cursor: "pointer" }} onClick={nextSlide}/>
                                {
                                    SliderImages.map((SliderImage, index) => {
                                        return (
                                            <div className={index === current ? 'slideImage active' : 'slideImage'} key={index} >
                                                {
                                                    index === current 
                                                    && 
                                                    <img style={{ width: "500px", borderRadius: "10px" }} src={SliderImage.image} alt="SliderImage" />
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Container>
    );
};

export default Slider;