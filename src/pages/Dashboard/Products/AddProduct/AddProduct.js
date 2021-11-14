import React from 'react';
import { Container, Grid, Box, Button, Typography, TextField, TextareaAutosize, CircularProgress, Alert, IconButton, Fab, Paper } from '@mui/material';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const generateKey = `${Math.ceil(Math.random(9999))}_${ new Date().getTime() }`;

    const onSubmit = (data) => {
        data.key = generateKey;
        data.createdAt = new Date().toLocaleDateString();
        const url = `http://localhost:5001/products/create`
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
                alert("Data Created...");
            }
            else {
                alert("Something Wrong!!!");
            }
        });
    }

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", }}>
                            Add Product
                        </Typography>
                        <Paper sx={{ mt: 3 }}>
                            <Box sx={{ display: "flex", p: 4 }}>
                                <form onSubmit={handleSubmit(onSubmit)} >
                                
                                    <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <TextField
                                        id="outlined-input"
                                        type="text"
                                        label="Title"
                                        color="secondary"
                                        placeholder="Enter Title"
                                        maxRows={4}
                                        {...register("title", { required: true })}
                                        />
                                        {errors.title?.type === 'required' && <span style={{ color: "brown" }}>This field is required</span>}
                                        <TextField
                                        id="outlined-number-input"
                                        label="Price"
                                        type="number"
                                        color="secondary"
                                        placeholder="Enter Price"
                                        {...register("price", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-number-input"
                                        label="Package Price"
                                        type="number"
                                        color="secondary"
                                        placeholder="Enter Package Price"
                                        {...register("packagePrice", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-number-input"
                                        label="Rating"
                                        type="number"
                                        color="secondary"
                                        placeholder="Enter Rating"
                                        {...register("rating", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-input"
                                        label="Manufacturer"
                                        type="text"
                                        color="secondary"
                                        placeholder="Enter Menufacturer"
                                        {...register("manufacturer", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-input"
                                        label="Made By"
                                        type="text"
                                        color="secondary"
                                        placeholder="Enter Country"
                                        {...register("madeBy", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-multiline"
                                        label="Short Description"
                                        multiline
                                        rows={3}
                                        color="secondary"
                                        placeholder="Enter Short Description"
                                        {...register("shortDesc", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-input"
                                        type="text"
                                        label="Image Url"
                                        color="secondary"
                                        placeholder="Enter Image Url/Path"
                                        maxRows={4}
                                        {...register("imageUrl", { required: true })}
                                        />
                                        <TextField
                                        id="outlined-multiline"
                                        label="Long Description"
                                        multiline
                                        rows={5}
                                        color="secondary"
                                        placeholder="Enter Long Description"
                                        {...register("longDesc", { required: true })}
                                        />
                                    
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

export default AddProduct;