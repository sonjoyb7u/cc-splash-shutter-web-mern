import React, { useEffect, useState } from 'react';
import {Container, Grid, Typography, Paper} from '@mui/material';
import { Box } from '@mui/system';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Header/Navigation/Navigation';
import ExploreProductDetail from '../ExploreProductDetail/ExploreProductDetail';


const ExploreProduct = () => {
    const [exploreProducts, setExploreProducts] = useState([]);

    useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/home/products`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setExploreProducts(result);
        });

    }, [exploreProducts]);

    return (
        <>
            <Navigation></Navigation>

            <Container sx={{ mt: 10 }}>
                <Box>
                    <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>Explore All Products: </Typography>
                </Box>
                <Paper sx={{ mt: 5, background: "#fff", p: 5, borderRadius: 3, }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                        <Typography variant="h6" sx={{  }}>Security Cameras & Systems: </Typography>
                        {/* <Button color="secondary" variant="outlined" >View All</Button> */}
                    </Box>
                    <Grid container spacing={2} >    
                        {
                            exploreProducts.map(exploreProduct => <ExploreProductDetail key={exploreProduct?._id} exploreProduct={exploreProduct}></ExploreProductDetail>)
                        }
                    </Grid>
                </Paper>
            </Container>

            <Footer></Footer>
        </>
    );
};

export default ExploreProduct;