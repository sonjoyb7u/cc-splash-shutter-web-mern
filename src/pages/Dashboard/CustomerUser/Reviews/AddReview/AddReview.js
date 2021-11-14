import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Button, Typography, TextField, TextareaAutosize, CircularProgress, Alert, IconButton, Fab, Paper } from '@mui/material';
import { useForm } from "react-hook-form";
import useAuth from '../../../../../assets/hooks/useAuth';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';

const AddReview = () => {
    let { path } = useRouteMatch();
    const history = useHistory();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const {user} = useAuth();

    // Guest User create Site review/feedback ...
    const onSubmit = (data) => {
        if(data.rating >= 6) {
            alert("Your rating must be less than 6 Or equal 5!!!");
        }
        else {
            data.name = user.displayName;
            data.email = user.email;
            data.imageUrl = user?.photoURL;
            data.display = "hide";
            data.createdAt = new Date().toLocaleDateString();
            const url = `http://localhost:5001/user/site-review/create`
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
                    alert("Your Site Review Submitted, Please wait for publishing...");
                    history.replace(`/dashboard/user/review/manage`);
                }
                else {
                    alert("Something Wrong!!!");
                }
            });
        }
    }


    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Typography id="transition-modal-title" variant="h5" component="h2"  sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                    Add Review
                </Typography>
                <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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

export default AddReview;