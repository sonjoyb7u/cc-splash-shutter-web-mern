import * as React from 'react';
import {
//   useRouteMatch,
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
import Rating from '@mui/material/Rating';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Button, Fab, Typography } from '@mui/material';
// import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
// import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
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

const ManageAllReviews = () => {
    // let { path } = useRouteMatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [allReviews, setAllReviews] = React.useState([]);
    const [displayStatus, setDisplayStatus] = React.useState('');
    const [reviewId, setReviewId] = React.useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const url = `https://pure-castle-02044.herokuapp.com/admins/allReviews`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setAllReviews(result)
        })

    }, [displayStatus]);


    // Review Display Update ...
    const handleDisplayChange = (e) => {
        setDisplayStatus({
            display: e.target.value
        });
    };
    const handleOrderStatusUpdated = (e) => {
        e.preventDefault();
        // console.log(reviewId, status);
        fetch(`https://pure-castle-02044.herokuapp.com/admins/review/status/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(displayStatus),
        })
        .then((res) => res.json())
        .then((result) => {
            // console.log(result);
            if(result.modifiedCount === 1) {
                alert("Woala, Review Status has been changed...");
                setDisplayStatus('');
            }
        })
    }


    // Delete Review ... 
    const handleDeletedReview = (reviewId) => {
        // console.log(productId);
        const confirmDelete = window.confirm("Are you sure want to delete this review?")
        if(confirmDelete) {
            // console.log(productId);
            const url = `https://pure-castle-02044.herokuapp.com/admins/review/delete/${reviewId}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                if(result.deletedCount > 0) {
                    alert("Review has been Deleted Success...");
                    const restOrders = allReviews?.filter(allReview => allReview._id !== reviewId)
                    setAllReviews(restOrders);
                }
                else {
                    alert("Review Deleted Failed, please try!!!");
                }
            })
        }
            
    }


    return (
        <Box sx={{ width: "100%", height: "100vh" }}>
            <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                Manage All Reviews: 
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ width: "100%", maxHeight: 4400 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sl No.</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Review</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Display</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allReviews
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((allReview, index) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={allReview._id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{allReview?.name}</TableCell>
                                <TableCell align="center">{allReview?.email}</TableCell>
                                <TableCell align="center">
                                    <img width="50" src={allReview?.imageUrl} alt="ProductImage" />
                                </TableCell>
                                <TableCell align="center">{allReview?.review.slice(0, 30)} ...</TableCell>
                                <TableCell align="center">
                                    <Rating name="read-only" value={parseInt(allReview?.rating)} readOnly />
                                </TableCell>
                                <TableCell align="center" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <form onSubmit={handleOrderStatusUpdated} >
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Display</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                sx={{ height: "40px", mb: 1}}
                                                defaultValue={displayStatus}
                                                label="Display"
                                                onChange={handleDisplayChange}
                                                onClick={() => setReviewId(allReview?._id)}
                                                >
                                                    <MenuItem value="show">Show</MenuItem>
                                                    <MenuItem value="hide">Hide</MenuItem>
                                                    {/* <MenuItem value="cancelled">Cancelled</MenuItem> */}
                                                </Select>
                                                <Button type="submit" variant="contained" color="secondary" size="small">Change</Button>
                                            </FormControl>
                                        </Box>
                                    </form>
                                    <Stack direction="column">
                                        <Chip label={allReview?.display} variant="contained" color="primary" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    
                                    <NavLink to={`/dashboard/admins/review/view/${allReview?._id}`}>
                                    <TootTip title="View For Detail">
                                        <Fab size="small" color="inherit" aria-label="edit">
                                            <FeedbackOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </TootTip>
                                    </NavLink>
                                    &nbsp;
                                    {/* <NavLink to={`${path}/edit/${allReview?._id}`}>
                                    <TootTip title="View For Edit">
                                        <Fab size="small" color="primary" aria-label="edit">
                                            <ModeEditOutlineOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </TootTip>
                                    </NavLink> */}
                                    &nbsp;
                                    <TootTip title="View For Delete">
                                    <Fab  onClick={() => handleDeletedReview(allReview?._id)} size="small"  color="secondary"  aria-label="delete">
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
                    count={allReviews.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ManageAllReviews;