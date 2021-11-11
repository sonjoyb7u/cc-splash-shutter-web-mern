import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Button, Typography, TextField, TextareaAutosize, CircularProgress, Alert, IconButton, Fab } from '@mui/material';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    // const generateKey = `${Math.ceil(Math.random(9999))}_${ new Date().getTime() }`;
    const _id = '618d74a9907a63097394ddb3';

    useEffect(() => {
        const url = `http://localhost:5001/products/edit/${_id}`
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setProduct(result);
            
        });

    }, []);


    const onSubmit = (data) => {
        console.log(data);
        // data.key = generateKey;
        // const url = `http://localhost:5001/products/create`
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(res => res.json())
        // .then(result => {
        //     console.log(result);
            // if(result.modifiedCount) {
            //     alert("Data Updated...");
            // }
            // else {
            //     alert("Something Wrong!!!");
            // }
        // });
    }

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    
                    <Grid item xs={12} sm={12} md={8}>
                        <Box>
                            <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
                                Edit Product
                            </Typography>
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
                                    label="Title"
                                    color="secondary"
                                    placeholder="Enter Title"
                                    maxRows={4}
                                    {...register("title", { required: true })}
                                    value={product?.title}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    {errors.title?.type === 'required' && <span style={{ color: "brown" }}>This field is required</span>}
                                    <TextField
                                    id="outlined-number-input"
                                    label="Price"
                                    type="number"
                                    color="secondary"
                                    placeholder="Enter Price"
                                    {...register("price", { required: true })}
                                    value={product?.price}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-number-input"
                                    label="Package Price"
                                    type="number"
                                    color="secondary"
                                    placeholder="Enter Package Price"
                                    {...register("packagePrice", { required: true })}
                                    value={product?.packagePrice}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-number-input"
                                    label="Rating"
                                    type="number"
                                    color="secondary"
                                    placeholder="Enter Rating"
                                    {...register("rating", { required: true })}
                                    value={product?.rating}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-input"
                                    label="Manufacturer"
                                    type="text"
                                    color="secondary"
                                    placeholder="Enter Menufacturer"
                                    {...register("manufacturer", { required: true })}
                                    value={product?.manufacturer}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-input"
                                    label="Made By"
                                    type="text"
                                    color="secondary"
                                    placeholder="Enter Country"
                                    {...register("madeBy", { required: true })}
                                    value={product?.madeBy}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-multiline"
                                    label="Short Description"
                                    multiline
                                    rows={3}
                                    color="secondary"
                                    placeholder="Enter Short Description"
                                    {...register("shortDesc", { required: true })}
                                    value={product?.shortDesc}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-input"
                                    type="text"
                                    label="Image Url"
                                    color="secondary"
                                    placeholder="Enter Image Url/Path"
                                    maxRows={4}
                                    {...register("imageUrl", { required: true })}
                                    value={product?.imageUrl}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                    <TextField
                                    id="outlined-multiline"
                                    label="Long Description"
                                    multiline
                                    rows={5}
                                    color="secondary"
                                    placeholder="Enter Long Description"
                                    {...register("longDesc", { required: true })}
                                    value={product?.longDesc}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                
                                </Box>
                                    <Button type="submit" variant="contained" color="secondary" size="large" >Update</Button>
                            </form>
 
                        </Box>
                    </Grid>
                    
                </Grid>
            </Box>
        </Container>
    );
};

export default EditProduct;