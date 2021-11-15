import React, { useState } from 'react';
import { Container, Grid, Box, Button, Typography, TextField, CircularProgress, Alert, IconButton, Paper } from '@mui/material';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '../../assets/hooks/useAuth';


const Registration = () => {
    const { userCustomRegistrationProcess, isUserComing, user, authSuccessMsg, setAuthSuccessMsg,  authErrorMsg, setAuthErrorMsg} = useAuth();
    const [registerFormData, setRegisterFormData] = useState({});
    const location = useLocation();
    const history = useHistory();

    const handleOnChangeBlurForm = (e) => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newRegisterFormData = {...registerFormData}
        newRegisterFormData[field] = value
        // console.log(newRegisterFormData);
        setRegisterFormData(newRegisterFormData)
        
    }
    // console.log(registerFormData);

    // User Registration Process...
    const handleRegistrationProcess = (e) => {
        e.preventDefault();
        if(registerFormData.password !== registerFormData.confirm_password) {
            setAuthSuccessMsg('');
            setAuthErrorMsg("Password & Confirm Password Does Not Matched!")
            return;
        }
        userCustomRegistrationProcess( registerFormData.displayName, registerFormData.email, registerFormData.imageUrl, registerFormData.password, history, location);
        
    };

    // const handleGoogleSignInProcess = () => {
    //     userSignInWithGoogleProcess(location, history)
    // }

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
                                    <Typography variant="h4" sx={{ color: "#AA076B", textAlign: "center", fontWeight: "bold", mb: 1 }}>
                                        Registration
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
                                       <form onSubmit={handleRegistrationProcess} style={{ width: "100%" }}>
                                            <TextField type="text" name="displayName" onBlur={handleOnChangeBlurForm} placeholder="Enter Full Name" id="standard-basic" label="Full Name" variant="standard" sx={{ width: "100%", m: 1 }}/>
                                            <TextField type="email" name="email" onBlur={handleOnChangeBlurForm} placeholder="Enter Email" id="standard-basic" label="Email" variant="standard" sx={{ width: "100%", m: 1 }}/>
                                            <TextField type="text" name="imageUrl" onBlur={handleOnChangeBlurForm}  placeholder="Your Image Url/Path" id="standard-basic" label="Image Url" variant="standard" sx={{ width: "100%", m: 1 }}
                                            />
                                            <TextField type="password" name="password" onBlur={handleOnChangeBlurForm}  placeholder="Your Password" id="standard-basic" label="Password" variant="standard" sx={{ width: "100%", m: 1 }}/>
                                            <TextField type="password" name="confirm_password" onBlur={handleOnChangeBlurForm}  placeholder="Re-Type Your Password" id="standard-basic" label="Confirm Password" variant="standard" sx={{ width: "100%", m: 1 }}/>
                                        
                                            
                                            <div>
                                                <Button type="submit" variant="contained" style={{ width: "50%", background: "#AA076B", display: "block", margin: "20px auto" }} >
                                                    Registration
                                                </Button>
                                            </div>
                                            

                                            <div>
                                                <span style={{ color: "brown" }}>Already Have An Account?</span>
                                                <NavLink to="/login">
                                                    <Button type="submit" variant="link" style={{ fontSize: "12px", display: "inline-block" }}>Please Login</Button>
                                                </NavLink>
                                            </div>

                                            <NavLink to="/">
                                                <Button type="submit" variant="link" style={{ color: "green", fontSize: "12px", display: "block", margin: "10px auto 0" }}>Go To Home</Button>
                                            </NavLink>
                                            
                                        </form>

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

export default Registration;