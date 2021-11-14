import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Button, Typography, TextField, TextareaAutosize, CircularProgress, Alert, IconButton, Fab, Input } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm({});
    // const generateKey = `${Math.ceil(Math.random(9999))}_${ new Date().getTime() }`;
    // const _id = '618e12fb017b15008c7645f9';

    // Fetch data from database ...
    useEffect(() => {
        const url = `http://localhost:5001/products/edit/${id}`
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setProduct(result);
            
        });

    }, []);

    const handleFormInputChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const updateFormInputData = {...product};
        updateFormInputData[field] = value;
        setProduct(updateFormInputData);   
    }

    // Update data to database ... 
    const onSubmit = (data) => {
        data = {...product};
        data.updatedAt = new Date().toLocaleDateString();
        console.log(data);
        const url = `http://localhost:5001/products/update/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if(result.modifiedCount) {
                // reset();
                alert("Data Updated...");
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
                    
                    <Grid item xs={12} sm={12} md={9}>
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
                                    {...register("title")}
                                    value={product?.title || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("price")}
                                    value={product?.price || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("packagePrice")}
                                    value={product?.packagePrice || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("rating")}
                                    value={product?.rating || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("manufacturer")}
                                    value={product?.manufacturer || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("madeBy")}
                                    value={product?.madeBy || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("shortDesc")}
                                    value={product?.shortDesc || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("imageUrl")}
                                    value={product?.imageUrl || ''}
                                    onChange={handleFormInputChange}
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
                                    {...register("longDesc")}
                                    value={product?.longDesc || ''}
                                    onChange={handleFormInputChange}
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