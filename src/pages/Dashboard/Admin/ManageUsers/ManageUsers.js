import * as React from 'react';
import {
  useRouteMatch,
  NavLink
} from "react-router-dom";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Fab, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
// import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { Box } from '@mui/system';
// import { useForm } from "react-hook-form";


const ManageUsers = () => {
    let { path } = useRouteMatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = React.useState([]);
    const [role, setRole] = React.useState('');
    const [userId, setUserId] = React.useState('');
    // const { register, handleSubmit } = useForm();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/users`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setUsers(result)
        })

    }, [role]);


    // const handleUserId = (id) => {
    //     setUserId(id);
    // };

    // User Role status change process ...
    const handleRoleChange = (e) => {
        setRole({
            role: e.target.value
        });
    }
    const handleUserRoleChanged = (e) => {
        e.preventDefault();
        fetch(`https://pure-castle-02044.herokuapp.com/users/roleChange/${userId}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(role),
        })
        .then((res) => res.json())
        .then((result) => {
            // console.log(result);
            if(result.modifiedCount === 1) {
                alert("Woala, User role has been changed...");
                setRole('')
            }
        })

    };


    // Delete User process ... 
    const handleDeletedUser = (userId) => {
        // console.log(productId);
        const confirmDelete = window.confirm("Are you sure want to delete this user?")
        if(confirmDelete) {
            // console.log(productId);
            const url = `https://pure-castle-02044.herokuapp.com/users/delete/${userId}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                if(result.deletedCount > 0) {
                    alert("User has been Deleted Success...");
                    const restUsers = users?.filter(user => user._id !== userId)
                    setUsers(restUsers)
                }
                else {
                    alert("User Deleted Failed, please try!!!");
                }
            })
        }
            
    }


    return (
        <Box>
            <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                Manage All Users: 
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ width: "100%", maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sl No.</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((user, index) => {
                            return (
                                
                            <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{user?.displayName}</TableCell>
                                <TableCell align="center">
                                    {user?.email}
                                </TableCell>
                                <TableCell align="center" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <form onSubmit={handleUserRoleChanged}>
                                        <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            sx={{ height: "40px", mb: 1}}
                                            defaultValue={role}
                                            label="Role"
                                            onChange={handleRoleChange}
                                            onClick={() => setUserId(user?._id)}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="guest">Guest</MenuItem>
                                            </Select>
                                            <Button type="submit" variant="contained" color="secondary" size="small">Change</Button>
                                        </FormControl>
                                        </Box>
                                    </form>
                                    <Stack direction="column">
                                        <Chip label={user?.role} variant="contained" color="primary" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Fab onClick={() => alert("Now Under Processing...")} size="small" color="inherit" aria-label="view">
                                        <PreviewOutlinedIcon fontSize="small" />
                                    </Fab>
                                    &nbsp;&nbsp;
                                    {/* <NavLink to={`${path}/edit/${user?._id}`}> */}
                                        <Fab  onClick={() => alert("Now Under Processing...")} size="small" color="primary" aria-label="edit">
                                            <ModeEditOutlineOutlinedIcon fontSize="small" />
                                        </Fab>
                                    {/* </NavLink> */}
                                    &nbsp;&nbsp;
                                    <Fab onClick={() => handleDeletedUser(user?._id)} size="small"  color="secondary"  aria-label="delete">
                                        <DeleteForeverOutlinedIcon fontSize="small" />
                                    </Fab>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ManageUsers;