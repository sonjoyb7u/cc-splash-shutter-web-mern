import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {Box, Container, Card, Grid, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button, Paper} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Header/Navigation/Navigation';

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const url = `http://localhost:5001/product-detail/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setProduct(result)
        })
    }, []);

    const {_id, imageUrl, title, shortDesc, longDesc, price, packagePrice, key} = product;

    return (
        <>
            <Navigation></Navigation>
            <Container sx={{ mt: 5 }}>
                <Box>
                    <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>Product Details: </Typography>
                </Box>
                <Paper sx={{ mt: 5, background: "#fff", p: 5, borderRadius: 3, }}>
                    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid item xs={12} sm={12} md={7} lg={7} >
                            <Card sx={{ border: "1px solid violet" }}>
                                <CardMedia
                                    sx={{ width:"70%", m: "0 auto" }}
                                    component="img"
                                    alt="green iguana"
                                    height="350px"
                                    image={imageUrl}
                                    
                                />
                                <CardContent sx={{ p: 3, borderTop: "2px solid violet", borderRadius: "0 0 20px 20px" }}>
                                    <Typography  sx={{ mb: 3 }} gutterBottom variant="h5" component="div">
                                    {title}
                                    </Typography>
                                    <Typography sx={{ mb: 2 }} variant="body1" color="text.secondary">
                                    <strong>Details: </strong>
                                    {longDesc}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                    <strong>Price: </strong>
                                    ${price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
                                    <Button variant="contained" color="secondary" size="small">Add To Cart</Button>
                                    <NavLink to={`/shipping-detail/${_id}`}>
                                        <Button variant="contained" color="secondary" size="small">Buy Now</Button>
                                    </NavLink>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5} >
                            Add To Cart Calculus
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer></Footer>
        </>
    );
};

export default ProductDetail;