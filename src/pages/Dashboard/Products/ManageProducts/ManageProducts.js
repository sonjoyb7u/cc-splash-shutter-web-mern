import * as React from 'react';
import {
  Switch,
  Route,
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
import { Fab, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { Box } from '@mui/system';


const ManageProducts = () => {
    let { path, url } = useRouteMatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [products, setProducts] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        const url = `http://localhost:5001/products`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            setProducts(result)
        })

    }, []);


    // Delete Product Delete ... 
    const handleDeletedProduct = (productId) => {
        // console.log(productId);
        const confirmDelete = window.confirm("Are you sure want to delete this product?")
        if(confirmDelete) {
            // console.log(productId);
            const url = `http://localhost:5001/products/delete/${productId}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                if(result.deletedCount > 0) {
                    alert("Product has been Deleted Success...");
                    const restProducts = products?.filter(product => product._id !== productId)
                    setProducts(restProducts)
                }
                else {
                    alert("Product Deleted Failed, please try!!!");
                }
            })
        }
            
    }

    return (
        <Box>
            <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ textAlign: "center", color: "#660460", fontWeight: "bold", mb: 3 }}>
                Manage All Products: 
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ width: "100%", maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sl No.</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Package Price</TableCell>
                            <TableCell align="center">Display</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((product, index) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={product.key}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{product?.title.slice(0, 50)} ...</TableCell>
                                <TableCell align="center">
                                    <img width="60" src={product?.imageUrl} alt="ProductImage" />
                                </TableCell>
                                <TableCell align="center">&#2547; {product?.price}</TableCell>
                                <TableCell align="center">&#2547; {product?.packagePrice}</TableCell>
                                <TableCell align="center">{product?.display}</TableCell>
                                <TableCell>
                                    <Fab size="small" color="inherit" aria-label="edit">
                                        <PreviewOutlinedIcon fontSize="small" />
                                    </Fab>
                                    &nbsp;&nbsp;
                                    <NavLink to={`${path}/edit/${product?._id}`}>
                                        <Fab size="small" color="primary" aria-label="edit">
                                            <ModeEditOutlineOutlinedIcon fontSize="small" />
                                        </Fab>
                                    </NavLink>
                                    &nbsp;&nbsp;
                                    <Fab onClick={() => handleDeletedProduct(product?._id)} size="small"  color="secondary"  aria-label="delete">
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
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
        
    );
};

export default ManageProducts;