import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from '../../../../assets/hooks/useAuth';

const AdminHome = () => {
    const {user, isAdmin} = useAuth();

    return (
        <>

            <Box style={{ height: "100vh" }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h3" color="secondary" >Welcome, Mr. {user?.displayName} (Super Admin) To Your Dashboard</Typography>
                </Paper>
            </Box>

        </>
    );
};

export default AdminHome;