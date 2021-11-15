import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Grid, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Rating } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
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

const Product = ({product}) => {
    const {_id, title, imageUrl, price, rating, packagePrice, shortDesc, createdAt} = product;

    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card sx={{ maxWidth: 345, background: "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)" }}>
                <CardHeader
                    sx={{ color: "#fff" }}
                    avatar={
                    <Avatar src={imageUrl} aria-label="CC Cameras"></Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon style={actionBtnStyle} />
                    </IconButton>
                    }
                    title={title.slice(0, 55)}
                    subheader={<strong >Lunched: {createdAt}</strong>}
                />
                <NavLink to={`/product-detail/${_id}`}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={imageUrl}
                        alt="Paella dish"
                    />
                </NavLink>
                <CardContent >
                    <Rating sx={{ mb: 2 }} name="read-only" value={parseInt(rating)} /> 
                    <Typography variant="body2" color="#fff"><strong>Description: </strong><br />
                    {shortDesc.slice(0, 100)} ... ...
                    </Typography>
                    <Typography variant="h6" color="#fff" sx={{ mt: 2 }}><strong>Price: </strong>
                    ${price}
                    </Typography>
                    <Typography variant="h6" color="#fff"><strong>Package Price: </strong>
                    ${packagePrice}
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
                    <NavLink to={`/product-detail/${_id}`}>
                        <IconButton aria-label="view">
                            <TootTip title="view for order">
                                <VisibilityOutlinedIcon title="" style={actionBtnStyle}  />
                            </TootTip>
                        </IconButton>
                    </NavLink>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;