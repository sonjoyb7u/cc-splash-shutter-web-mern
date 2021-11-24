import React, { useEffect, useState } from 'react';
import {Container, Grid, Typography, InputBase, Button, Paper} from '@mui/material';
import { Box } from '@mui/system';
import Product from '../Product/Product';
import { NavLink } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

//  Start Search bar handle process ... 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.dark, 0.8),
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.9),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  color: "#fff"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
//  End Search bar handle process ... 


const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // const url = `http://localhost:5002/home/products`;
        const url = `https://pure-castle-02044.herokuapp.com/home/products`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setProducts(result.slice(0, 6));
        });

    }, []);

    // console.log(products);

    return (
        <Container sx={{ mt: 20 }}>
            <Box>
                <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>All Time Sales: </Typography>
            </Box>
            <Paper sx={{ mt: 5, background: "#fff", p: 5, borderRadius: 3, }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
                    <Typography variant="h6" sx={{  }}>Security Cameras & Systems: </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <NavLink to='/explore-products'>
                        <Button color="secondary" variant="outlined" >View All</Button>
                    </NavLink>
                </Box>
                <Grid container spacing={3}>
                    {
                        products.map(product => <Product key={product?._id} product={product}></Product>)
                    }
                </Grid>
            </Paper>
        </Container>
    );
};

export default Products;