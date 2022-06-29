import React, { useState } from 'react';
import { Container, Grid, Button, Typography, TextField, CircularProgress, Alert, IconButton, Fab, Paper } from '@mui/material';  
import { Box } from '@mui/system';
// import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// import loginImg from './../../../assets/images/login/login_image_1.png'
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import useAuth from '../../../assets/hooks/useAuth';


// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });

const Login = () => {
    const {userCustomLoginProcess, userSignInWithGoogleProcess, isUserComing, user, authSuccessMsg, setAuthSuccessMsg, authErrorMsg, setAuthErrorMsg} = useAuth();
    const [loginFormData, setLoginFormData] = useState({});
    const location = useLocation();
    const history = useHistory();

    const handleOnChangeBlurForm = (e) => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newLoginFormData = {...loginFormData}
        newLoginFormData[field] = value
        // console.log(newLoginFormData);
        setLoginFormData(newLoginFormData)
        
    }
    // console.log(loginFormData);

    // User Login Process...
    const handleCustomLoginProcess = (e) => {
        e.preventDefault();
        userCustomLoginProcess(loginFormData.email, loginFormData.password, location, history)
    }

    const handleGoogleSignInProcess = () => {
        userSignInWithGoogleProcess(location, history)
    }

    // User Reset password process... 
    const handleForgotPasswordProcess = (e) => {
        e.preventDefault();
        alert("Forgot Password...")
    }

    // Confirm Alert Message State ...
    const [open, setOpen] = React.useState(true);

    return (

        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
            {
                !isUserComing 
                &&
                <Box sx={{ p: 5, margin: 'auto', maxWidth: 500, flexGrow: 1, mt: 8 }}>
                    <Grid container spacing={2}>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Paper elevation={3} sx={{ py: 4, px: 6 }} >
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <Typography variant="h4" sx={{ color: "#AA076B", textAlign: "center", fontWeight: "bold", mb: 2 }}>
                                        Login
                                        </Typography>
                                        {/* Confirm  Success Message Show Process ...  */}
                                        {
                                            (user?.email || authSuccessMsg) 
                                            && 
                                            <Collapse in={open}>
                                                <Alert
                                                severity="success"
                                                action={
                                                    <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setAuthSuccessMsg('');
                                                    }}
                                                    >
                                                    <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2, width: "100%", margin: "0 auto" }}
                                                >
                                                {authSuccessMsg} 
                                                </Alert>
                                            </Collapse>
                                        }

                                        {/* Confirm Error Message Show Process ...  */}       
                                        {
                                            authErrorMsg 
                                            && 
                                            <Collapse in={open}>
                                                <Alert
                                                severity="error"
                                                action={
                                                    <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setAuthErrorMsg('');
                                                    }}
                                                    >
                                                    <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                                sx={{ mb: 2, width: "100%", margin: "0 auto" }}
                                                >
                                                {authErrorMsg} 
                                                </Alert>
                                            </Collapse>
                                        }

                                        <Box>

                                            {
                                                !isUserComing
                                                &&
                                                <form onSubmit={handleCustomLoginProcess} style={{ width: "100%" }}>
                                                    <TextField type="email" name="email" onBlur={handleOnChangeBlurForm} placeholder="Enter Email" id="standard-basic" label="Email" variant="standard" sx={{ width: "80%", m: 1 }}/>
                                                    <TextField type="password" name="password" onBlur={handleOnChangeBlurForm}  placeholder="Your Password" id="standard-basic" label="Password" variant="standard" sx={{ width: "80%", m: 1 }}/>
                                                    
                                                    <div>
                                                        <span style={{ color: "brown" }}>Forgot your password?</span>
                                                        <Button onClick={handleForgotPasswordProcess} type="submit" variant="link" style={{ fontSize: "12px", display: "inline-block" }}>Click Here</Button>
                                                    </div>
                                                    
                                                    <div>
                                                        <Button type="submit" variant="contained" style={{ width: "50%", background: "#AA076B  ", display: "block", margin: "20px auto" }} >
                                                            Login
                                                        </Button>
                                                    </div>
                                                    <span>----------------OR---------------</span>
                                                    <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
                                                        <Fab onClick={handleGoogleSignInProcess} size="small" color="secondary" aria-label="add">
                                                            <GoogleIcon fontSize="small" />
                                                        </Fab>
                                                        &nbsp;
                                                        <Fab size="small" color="secondary" aria-label="add">
                                                            <FacebookRoundedIcon fontSize="small" />
                                                        </Fab>
                                                        &nbsp;
                                                        <Fab size="small" color="secondary" aria-label="add">
                                                            <GitHubIcon fontSize="small" />
                                                        </Fab>
                                                    </Box>

                                                    <div style={{ display: "block", margin: "20px auto 0" }}>
                                                        <span style={{ color: "brown" }}>Create An Account?</span>
                                                        <NavLink to="/registration">
                                                            <Button type="submit" variant="link" style={{ fontSize: "12px", display: "inline-block" }}>Click Here</Button>
                                                        </NavLink>
                                                    </div>

                                                    <NavLink to="/">
                                                        <Button type="submit" variant="link" style={{ color: "green", fontSize: "12px", display: "block", margin: "10px auto 0" }}>Go To Home</Button>
                                                    </NavLink>
                                                    
                                                </form>
                                            }

                                        </Box>
                                        
                                    </Grid>

                                </Paper>
                            </Box>

                    </Grid>

                    
                </Box>
            }

            {
                isUserComing 
                &&
                <CircularProgress sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto" }} color="inherit" />
            }
        </Container>

    );
};

export default Login;