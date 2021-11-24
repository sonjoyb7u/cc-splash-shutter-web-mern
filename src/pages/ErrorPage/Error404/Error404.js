import React from 'react';
import { NavLink } from 'react-router-dom';
import './Error404'
import SubdirectoryArrowLeftOutlinedIcon from '@mui/icons-material/SubdirectoryArrowLeftOutlined';
import error404Image from './../../../assets/images/error_page/error_404/error_404_1.png'
import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';

const Error404 = () => {

    return (
        <Container >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={10} >
                        <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box>
                                <img width="100%" height="100%" sx={{ }} src={error404Image} alt="Error404Image" />
                            </Box>
                            <Box>
                                <NavLink to="/" >
                                    <Button style={{ minWidth: "220px", backgroundColor: "#fa5624",color: "white", fontWeight: "bold", textDecoration: "none", border: "transparent", outline: "none", padding: "10px 20px" }}>Back To Home &nbsp; <SubdirectoryArrowLeftOutlinedIcon className="error-404-icon" /></Button>
                                </NavLink>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
};

export default Error404;