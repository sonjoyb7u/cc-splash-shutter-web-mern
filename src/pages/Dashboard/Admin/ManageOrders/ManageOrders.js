import * as React from 'react';
import {
  useRouteMatch,
  NavLink
} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button, Fab, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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



const ManageOrders = () => {
    let { path } = useRouteMatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [allOrders, setAllOrders] = React.useState([]);
    const [status, setStatus] = React.useState('');
    const [orderId, setOrderId] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/admins/allOrders`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setAllOrders(result)
        })

    }, [status]);


    // Order Status Update ...
    const handleStatusChange = (e) => {
        setStatus({
            status: e.target.value
        });
    };
    const handleOrderStatusUpdated = (e) => {
        e.preventDefault();
        // console.log(orderId, status);
        fetch(`https://pure-castle-02044.herokuapp.com/admins/order/status/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(status),
        })
        .then((res) => res.json())
        .then((result) => {
            // console.log(result);
            if(result.modifiedCount === 1) {
                alert("Woala, Order Status has been changed...");
                setStatus('');
            }
        })
    }

    


    // Delete Order ... 
    const handleDeletedOrder = (orderId) => {
        // console.log(productId);
        const confirmDelete = window.confirm("Are you sure want to delete this order?")
        if(confirmDelete) {
            // console.log(productId);
            const url = `https://pure-castle-02044.herokuapp.com/admins/allOrder/delete/${orderId}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                if(result.deletedCount > 0) {
                    alert("Order has been Deleted Success...");
                    const restOrders = allOrders?.filter(allOrder => allOrder._id !== orderId)
                    setAllOrders(restOrders);
                }
                else {
                    alert("Order Deleted Failed, please try!!!");
                }
            })
        }
            
    }


    return (
        <Box sx={{ width: "100%", height: "100vh" }}>
            <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                Manage All Orders: 
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ width: "100%", maxHeight: 4400 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sl No.</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allOrders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((allOrder, index) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={allOrder._id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{allOrder?.name}</TableCell>
                                <TableCell align="center">{allOrder?.email}</TableCell>
                                <TableCell align="center">{allOrder?.phone}</TableCell>
                                <TableCell align="center">{allOrder?.address}</TableCell>
                                <TableCell align="center">{allOrder?.title.slice(0, 30)} ...</TableCell>
                                <TableCell align="center">
                                    <img width="50" src={allOrder?.imageUrl} alt="ProductImage" />
                                </TableCell>
                                <TableCell align="center">&#2547; {allOrder?.productPrice}</TableCell>
                                <TableCell align="center" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <form onSubmit={handleOrderStatusUpdated} >
                                        <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            sx={{ height: "40px", mb: 1}}
                                            defaultValue={status}
                                            label="Status"
                                            onChange={handleStatusChange}
                                            onClick={() => setOrderId(allOrder?._id)}
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="shipped">Shipped</MenuItem>
                                                <MenuItem value="delivered">Delivered</MenuItem>
                                                {/* <MenuItem value="cancelled">Cancelled</MenuItem> */}
                                            </Select>
                                            <Button type="submit" variant="contained" color="secondary" size="small">Change</Button>
                                        </FormControl>
                                        </Box>
                                    </form>
                                    <Stack direction="column">
                                        <Chip label={allOrder?.status} variant="contained" color="primary" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    
                                    {/* <NavLink to={`/dashboard/admins/order/view/${allOrder?._id}`}> */}
                                    <TootTip title="View Order Detail">
                                        <Fab onClick={() => alert("Now Under Processing...")} size="small" color="inherit" aria-label="edit">
                                            <PreviewOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </TootTip>
                                    {/* </NavLink> */}
                                    &nbsp;
                                    <NavLink to={`${path}/edit/${allOrder?._id}`}>
                                    <TootTip title="View For Edit">
                                        <Fab size="small" color="primary" aria-label="edit">
                                            <ModeEditOutlineOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </TootTip>
                                    </NavLink>
                                    &nbsp;
                                    <TootTip title="View For Delete">
                                    <Fab  onClick={() => handleDeletedOrder(allOrder?._id)} size="small"  color="secondary"  aria-label="delete">
                                        <DeleteForeverOutlinedIcon fontSize="small" />
                                    </Fab>
                                    </TootTip>
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
                    count={allOrders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ManageOrders;