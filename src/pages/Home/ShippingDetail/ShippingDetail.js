import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, TextField, Paper } from '@mui/material';
import { useForm } from "react-hook-form";
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Header/Navigation/Navigation';
import useAuth from '../../../assets/hooks/useAuth';

const ShippingDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const {user} = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const history = useHistory();

    useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/product-detail/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setProduct(result)
        })
    }, [id]);

    const {_id, imageUrl, title, price, key} = product;

    const onSubmit = (data) => {
        data.productId = _id;
        data.name = user.displayName;
        data.email = user.email;
        data.title = title;
        data.imageUrl = imageUrl;
        data.productPrice = price;
        data.productKey = key;
        data.status = "pending";
        data.createdAt = new Date().toLocaleDateString();
        // console.log(data);
        const url = `https://pure-castle-02044.herokuapp.com/user/order/create`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            if(result.insertedId) {
                reset();
                alert("Order Created Success...");
                history.replace('/place-order')
            }
            else {
                alert("Something Wrong!!!");
            }
        });
    }

    return (
        <>
            <Navigation></Navigation>

            <Container sx={{ mt: 5 }}>
                <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <Box>
                            <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>Shipping Details: </Typography>
                        </Box>
                        <Paper sx={{ p: 5, mt: 5 }}>
                            <form onSubmit={handleSubmit(onSubmit)} >
                            
                                <Box
                                sx={{
                                    '& .MuiTextField-root': { my: 1, mx: "auto", width: '35ch', display: "flex" }
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                    
                                    <TextField
                                    id="outlined-input"
                                    type="text"
                                    label="Full Name"
                                    color="secondary"
                                    placeholder="Enter full name"
                                    maxRows={4}
                                    {...register("name")}
                                    value={user.displayName || ''}
                                    disabled
                                    />
                                    <TextField
                                    id="outlined-number-input"
                                    label="Email"
                                    type="email"
                                    color="secondary"
                                    placeholder="Enter email address"
                                    {...register("email")}
                                    value={user.email || ''}
                                    disabled
                                    />
                                    <TextField
                                    id="outlined-number-input"
                                    label="Phone Number"
                                    type="text"
                                    color="secondary"
                                    placeholder="Enter phone"
                                    {...register("phone")}
                                    
                                    />
                                    <TextField
                                    id="outlined-number-input"
                                    label="Delivery Address"
                                    type="text"
                                    color="secondary"
                                    placeholder="Enter delivery address"
                                    {...register("address")}
                                    
                                    />
                                    <TextField
                                    id="outlined-number-input"
                                    label="Country"
                                    type="text"
                                    color="secondary"
                                    placeholder="Enter country"
                                    {...register("country")}
                                    
                                    />
                                    <TextField
                                    id="outlined-input"
                                    label="Product Name"
                                    color="secondary"
                                    placeholder="Enter Title"
                                    maxRows={4}
                                    {...register("title")}
                                    value={title || ''}
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <br/>
                                    <img width="25%" style={{ marginLeft: "50px" }} src={imageUrl} alt="ProductImage" />
                                    
                                    {/* <TextField
                                    id="outlined-input"
                                    type="text"
                                    label="Image Url"
                                    color="secondary"
                                    value={imageUrl}
                                    maxRows={4}
                                    disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    /> */}
                                    
                                
                                </Box>
                                <Button sx={{ mt: 5, display: "block", margin: "0 auto" }} type="submit" variant="contained" color="secondary" size="large" >Place Order</Button>
                            </form>

                        </Paper>
                    </Grid>
                        
                </Grid>
            </Container>

            <Footer></Footer>
        </>
    );
};

export default ShippingDetail;