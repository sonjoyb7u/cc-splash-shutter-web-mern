import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { HelpServices } from '../../RawStaticData/RawStaticData';

const HelpService = () => {
    return (
        <Container sx={{ mt: 8 }}>
            <Grid container spacing={2}>
                {
                    HelpServices.map(({icon, title, desc}) => <Grid key={title} item xs={12} sm={6} md={3} lg={3}>
                        <Paper elevation={6}  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                            <img style={{ width: "50px" }} src={icon} alt="Help Service Icon" />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>{title}</Typography>
                                <Typography variant="subtitle1" sx={{ fontSize: "" }}>{desc}</Typography>
                            </Box>
                        </Paper>
                     </Grid>)
                }
                
            </Grid>
        </Container>
    );
};

export default HelpService;