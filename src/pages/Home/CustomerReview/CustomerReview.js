import React from 'react';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import customerReviewImg from './../../../assets/images/customer-review/people-1.png'


const CustomerReview = () => {
    return (
        <Container sx={{ mt: 20 }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>Our Client Says: </Typography>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={4} lg={4}>
                    <Card sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", p: 3 }}>
                        <Typography variant="body1" color="text.secondary" component="div">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, minus!
                        </Typography>
                        
                        <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                            <CardMedia
                            component="img"
                            sx={{ width: "60px" }}
                            image={customerReviewImg}
                            alt="Customer Image"
                            />
                            
                            <CardContent sx={{ textAlign: "left" }}>
                                <Typography component="div" variant="h6">
                                    Customer Name
                                </Typography>
                                <Typography component="div" variant="title1">
                                    Client
                                </Typography>
                                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton aria-label="previous">

                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                    
                                    </IconButton>
                                    <IconButton aria-label="next">
                                    
                                    </IconButton>
                                </Box> */}
                            </CardContent>
                        </Box>  
                        
                    </Card>
                </Grid>
            </Grid>

        </Container>
    );
};

export default CustomerReview;