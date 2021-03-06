import React from 'react';
import { Button, CardActionArea, Container, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import orderPlaceImg from './../../../assets/images/place-order/giphy.gif'
import { NavLink } from 'react-router-dom';

const PlaceOrder = () => {
    return (
        <Container sx={{ height: "100vh" }}>
            {/* <Paper elevation={3} > */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card sx={{ maxWidth: 550, mt: 7, p: 2 }}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="300"
                            image={orderPlaceImg}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" color="violet">
                                Your Order Has Been Placed Successful,<br/> Please Wait For Confirmation & Delivery Process...
                            </Typography>
                            <NavLink to="/" >
                                <Button variant="contained" color="secondary">Go Back To Home Page</Button>
                            </NavLink>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    
                </Box>
            {/* </Paper> */}
        </Container>
    );
};

export default PlaceOrder;