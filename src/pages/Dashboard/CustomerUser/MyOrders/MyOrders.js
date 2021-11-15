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
import { Fab, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { Box } from '@mui/system';
import useAuth from '../../../../assets/hooks/useAuth';


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


const MyOrders = () => {
    let { path } = useRouteMatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [myOrders, setMyOrders] = React.useState([]);
    const {user} = useAuth();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/user/myOrders/${user?.email}`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setMyOrders(result)
        })

    }, [user?.email, myOrders]);


    // Delete My Order ... 
    const handleDeletedMyOrder = (orderId) => {
        // console.log(productId);
        const confirmDelete = window.confirm("Are you sure want to delete this order?")
        if(confirmDelete) {
            // console.log(productId);
            const url = `https://pure-castle-02044.herokuapp.com/user/myOrder/delete/${orderId}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                if(result.deletedCount > 0) {
                    alert("My Order has been Deleted Success...");
                    const restOrders = myOrders?.filter(myOrder => myOrder._id !== orderId)
                    setMyOrders(restOrders)
                }
                else {
                    alert("My Order Deleted Failed, please try!!!");
                }
            })
        }
            
    }


    return (
        <Box sx={{ height: "100vh" }}>
            <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                Manage My Orders: 
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
                        {myOrders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((myOrder, index) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={myOrder._id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{myOrder?.name}</TableCell>
                                <TableCell align="center">{myOrder?.email}</TableCell>
                                <TableCell align="center">{myOrder?.phone}</TableCell>
                                <TableCell align="center">{myOrder?.address}</TableCell>
                                <TableCell align="center">{myOrder?.title.slice(0, 30)} ...</TableCell>
                                <TableCell align="center">
                                    <img width="50" src={myOrder?.imageUrl} alt="ProductImage" />
                                </TableCell>
                                <TableCell align="center">&#2547; {myOrder?.productPrice}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1}>
                                        <Chip label={myOrder?.status} variant="contained" color="secondary" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    
                                    <NavLink to={`${path}/product-review/add/${myOrder?._id}`}>
                                    <TootTip title="Create Product Feedback/Review">
                                        <Fab size="small" color="inherit" aria-label="edit">
                                            <FeedbackOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </TootTip>
                                    </NavLink>
                                    &nbsp;
                                    {/* <TootTip title="View For Edit">
                                    <NavLink to={`${path}/edit/${myOrder?._id}`}>
                                        <Fab size="small" color="primary" aria-label="edit">
                                            <ModeEditOutlineOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </NavLink>
                                    </TootTip>
                                    &nbsp; */}
                                    {
                                       myOrder?.status === "pending" 
                                       && 
                                        <TootTip title="View For Delete">
                                        <Fab  onClick={() => handleDeletedMyOrder(myOrder?._id)} size="small"  color="secondary"  aria-label="delete">
                                            <DeleteForeverOutlinedIcon fontSize="small" />
                                        </Fab>
                                        </TootTip>
                                    }
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
                    count={myOrders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default MyOrders;