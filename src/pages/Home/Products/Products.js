import React from 'react';
import { styled } from '@mui/material/styles';
import {Container, Card, Grid, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom';


const actionBtnStyle = {
    color: "#650460",
    fontSize: "30px",
}

// TootTip Info Title ...
const TootTip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const Products = () => {


    return (
        <Container sx={{ mt: 20 }}>
            <Box>
                <Typography variant="h5" sx={{ borderBottom: "2px solid #6A0460" }}>All Time Sales: </Typography>
            </Box>
            <Box sx={{ mt: 5, background: "#fff", p: 5, borderRadius: 3, }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Typography variant="h5" sx={{  }}>Security Cameras & Systems: </Typography>
                    <Button color="secondary" variant="outlined" >View All</Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <Card sx={{ maxWidth: 345, background: "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)" }}>
                            <CardHeader
                                sx={{ color: "#fff" }}
                                avatar={
                                <Avatar src="https://i.ibb.co/qWYHqZh/37be412e2234759b9e90cbd9ce71beab.jpg" aria-label="CC Cameras"></Avatar>
                                }
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon style={actionBtnStyle} />
                                </IconButton>
                                }
                                title="V380 Waterproof Night Vision Outdoor Full HD Wifi Camera"
                                subheader="Lunch: September 14, 2021"
                            />
                            <NavLink to="/">
                                <CardMedia
                                    component="img"
                                    height="260"
                                    image="https://i.ibb.co/qWYHqZh/37be412e2234759b9e90cbd9ce71beab.jpg"
                                    alt="Paella dish"
                                />
                            </NavLink>
                            <CardContent>
                                <Typography variant="body2" color="#fff"><strong>Description: </strong><br />
                                Resolution: 2 MP,; Device : Mobile / computer / Laptop / Tab; Image Resolution: 1080P HD; Apps : V 380 Audio; System : Speaking & Listening ...
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: "flex", justifyContent: "space-between"  }}>
                                <IconButton aria-label="add to cart">
                                    <TootTip title="Add To Cart">
                                        <ShoppingBasketOutlinedIcon style={actionBtnStyle} />
                                    </TootTip>
                                </IconButton>
                                <IconButton aria-label="add to favorites">
                                    <TootTip title="Add To Favorite">
                                        <FavoriteIcon title="" style={actionBtnStyle}  />
                                    </TootTip>
                                </IconButton>
                                <IconButton aria-label="view">
                                    <TootTip title="View For Shopping">
                                        <VisibilityOutlinedIcon title="" style={actionBtnStyle}  />
                                    </TootTip>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Products;