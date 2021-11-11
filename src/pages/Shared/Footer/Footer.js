import React from 'react';
import { Container, Grid, IconButton, List, ListItemText, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import MuiButton from '../../../StyledComponent/MuiButton';


// const useStyle = makeStyles({
//     socialIcon: {
//         color: '#19D3AE !important',
//         border: '1px solid #19D3AE !important',
//         margin: '20px 10px 30px 0 !important',
//         '&:hover': {
//             background: '#19D3AE !important',
//             color: '#fff !important'
//         }
//     }
// })

const actionBtnStyle = {
    color: "#650460",
    fontSize: "30px",
}

const Footer = () => {
    // const { socialIcon } = useStyle();

    return (
        <footer style={{ marginTop: "200px", backgroundImage: "linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%)" }}>
            <Container sx={{ color: "#fff" }}>
                <Grid container spacing={3} sx={{ my: 3 }}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <List sx={{ mt: 4 }}>
                            <ListItemText sx={{ color: '#6A0460', mb: 1 }}>My Account</ListItemText>
                            <ListItemText>Manage Your Account</ListItemText>
                            <ListItemText>Order Status</ListItemText>
                            <ListItemText>Check Gift Cards</ListItemText>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <List>
                            <ListItemText sx={{ color: '#6A0460', mb: 1 }}>Products</ListItemText>
                            <ListItemText >All Cameras & Systems</ListItemText>
                            <ListItemText>Media</ListItemText>
                            <ListItemText>Cameras Accessories</ListItemText>
                            <ListItemText>Construction & Surveying</ListItemText>
                            <ListItemText>Infrastructure</ListItemText>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <List>
                            <ListItemText variant="h6" sx={{ color: '#6A0460', mb: 1 }}>Help Center</ListItemText>
                            <ListItemText>Order Information</ListItemText>
                            <ListItemText>Check Up</ListItemText>
                            <ListItemText>Shipping</ListItemText>
                            <ListItemText>Payment Options</ListItemText>
                            <ListItemText>Return & Exchange</ListItemText>
                            <ListItemText>Product Warranty</ListItemText>
                            <ListItemText>Repair Center</ListItemText>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <List>
                            <ListItemText sx={{ color: '#6A0460', mb: 1 }}>Company Information</ListItemText>
                            <ListItemText>About Us</ListItemText>
                            <ListItemText>Careers</ListItemText>
                            <ListItemText>Customers Reviews</ListItemText>
                            <ListItemText>Privacy & policy</ListItemText>
                            <ListItemText>Terms & Conditions</ListItemText>
                            <ListItemText sx={{ color: '#6A0460', mb: 1 }}>Company Address</ListItemText>
                            <ListItemText>1/A-Gulshan-1, 1212-Dhaka</ListItemText>
                            <ListItemText>Bangladesh</ListItemText>
                        </List>
                        <IconButton className="">
                            <GoogleIcon style={actionBtnStyle} />
                        </IconButton>
                        <IconButton className="">
                            <TwitterIcon style={actionBtnStyle} />
                        </IconButton>
                        <IconButton className="">
                            <InstagramIcon style={actionBtnStyle} />
                        </IconButton>
                        <Typography>Call Now</Typography>
                        <MuiButton >+880-1915XXXXXX</MuiButton>
                    </Grid>
                </Grid>
                <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 500, py: 2 }} >All Credit Goes To Programming Hero Batch-4.</Typography>
                <Typography sx={{ textAlign: 'center'}} variant="subtitle2">Copyright &copy; {new Date().getFullYear()}&nbsp;,All Rights Reserved</Typography>
            </Container>
        </footer>
    );
};

export default Footer;