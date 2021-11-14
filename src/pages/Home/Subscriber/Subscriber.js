import React from 'react';
import { Button, Container, FormControl, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Subscriber = () => {
    const [values, setValues] = React.useState({
        amount: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    return (
        <section style={{ marginTop: "150px"}}>
            <Container spacing={1} >
                <Paper sx={{ background: "#fff", display: "flex", justifyContent: "center", alignItems: "center", p: 7 }}>
                    <Typography variant="h4" sx={{ textTransform: "capitalize", color: "#6A0460", fontWeight: 600 }}>
                        Send Your Email & <br/>Get In Touch :
                    </Typography>
                    <Box
                    sx={{
                        width: 400,
                        maxWidth: '100%',
                        ml: 4
                    }}
                    >
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard" id="standard-basic" label="Standard" color="secondary">
                            <InputLabel sx={{ fontSize: "25px", fontWeight: 700 }} htmlFor="standard-adornment-amount">Subscriber Email</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                value={values.amount}
                                onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <Button size="medium" variant="outlined" color="secondary" sx={{ ml: 3 }}>Send Email</Button>
                    </Box>
                </Paper>
            </Container>
        </section>
    );
};

export default Subscriber;