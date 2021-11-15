import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Button, Typography, TextField, Paper, Card, CardContent, CardMedia  } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useForm } from "react-hook-form";
import useAuth from '../../../../../assets/hooks/useAuth';
import { useHistory, useParams } from 'react-router-dom';


const ProductWiseReview = () => {
    const {id} = useParams();
    const history = useHistory();
    const [order, setOrder] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {user} = useAuth();

    useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/user/order/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setOrder(result)
        })

    }, [id]);

    // console.log(order);

    // Individual Product wise user create review/feedback ...
    const onSubmit = (data) => {
        if(data.rating >= 6) {
            alert("Your rating must be less than 6 Or equal 5!!!");
        }
        else {
            data.name = user.displayName;
            data.email = user.email;
            data.imageUrl = user?.photoURL;
            data.productId = order.productId;
            data.productTitle = order.title;
            data.productImageUrl = order.imageUrl;
            data.display = "hide";
            data.createdAt = new Date().toLocaleDateString();
            const url = `https://pure-castle-02044.herokuapp.com/user/product-review/create`;
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
                    alert("Your Product Review Submitted, Please wait for publishing...");
                    history.replace(`/dashboard/user/product-review/manage`);
                }
                else {
                    alert("Something Wrong!!!");
                }
            });
        }
    }

    return (
        <Container sx={{ height: "100vh" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography id="transition-modal-title" variant="h5" component="h2"  sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                    Add Product Wise Review
                </Typography>
                <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={12} sm={12} md={4} >
                        <Card >
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                image={order?.imageUrl}
                                alt="green iguana"
                                sx={{ width: "45%", m: "0 auto" }}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {order?.title} ... ...
                                </Typography>
                                <Typography variant="subtitle" color="text.secondary">
                                    <strong>Price: </strong>&#2547; {order?.productPrice}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <Paper >
                            <Box sx={{ m: 4, p: 2}}>
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <TextField
                                        id="outlined-multiline"
                                        label="Review"
                                        multiline
                                        rows={5}
                                        color="secondary"
                                        placeholder="Write Your Review"
                                        {...register("review", { required: true })}
                                        />
                                        {errors.title?.type === 'required' && <span style={{ color: "brown" }}>This field is required</span>}
                                        <TextField
                                        id="outlined-number-input"
                                        label="Rating"
                                        type="number"
                                        color="secondary"
                                        placeholder="Enter Rating"
                                        {...register("rating", { required: true })}
                                        />
                                        {/* <TextField
                                        id="outlined-number-input"
                                        label="Your Image"
                                        type="text"
                                        color="secondary"
                                        placeholder="Enter Your Image Url/Path"
                                        {...register("imageUrl", { required: true })}
                                        /> */}
                                    
                                    </Box>
                                    <Button type="submit" variant="contained" color="secondary" size="large" >Create</Button>
                                </form>
    
                            </Box>
                        </Paper>
                    </Grid>
                    
                </Grid>
            </Box>
        </Container>
    );
};

export default ProductWiseReview;