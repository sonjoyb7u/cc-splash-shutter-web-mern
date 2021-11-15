import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from '../../../../assets/hooks/useAuth';

const AdminHome = () => {
    const {user} = useAuth();
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/admins/products`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setAllProducts(result);
        });

    }, []);

    console.log(allProducts);


    return (
        <Container sx={{ height: "100vh" }}>
            <Box>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h3" color="secondary" >Welcome, Mr. {user?.displayName} (Admin) To Your Dashboard</Typography>
                </Paper>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <Box>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" color="secondary" >Total Users:   </Typography>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                     <Box>
                        <Paper elevation={3} sx={{ p: 2 }}><Typography variant="h6" color="secondary" >Total Products: <strong>{allProducts?.length}</strong></Typography></Paper>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                     <Box>
                        <Paper elevation={3} sx={{ p: 2 }}><Typography variant="h6" color="secondary" >Total Orders: </Typography></Paper>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                     <Box>
                        <Paper elevation={3} sx={{ p: 2 }}><Typography variant="h6" color="secondary" >Total Reviews: </Typography></Paper>
                    </Box>
                </Grid>
                </Grid>
            </Box>
            
        </Container>
    );
};

export default AdminHome;