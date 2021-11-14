import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button, CardMedia} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import BorderAllOutlinedIcon from '@mui/icons-material/BorderAllOutlined';
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  useHistory, 
  useLocation
} from "react-router-dom";
import AddProduct from '../Products/AddProduct/AddProduct';
import ManageProducts from '../Products/ManageProducts/ManageProducts';
import EditProduct from '../Products/EditProduct/EditProduct';
import useAuth from '../../../assets/hooks/useAuth';
import AdminPrivateRoute from '../AdminPrivateRoute/AdminPrivateRoute';
import ManageUsers from '../Admin/ManageUsers/ManageUsers';
import ManagePayments from '../CustomerUser/ManagePayments/ManagePayment';
import MyOrders from '../CustomerUser/MyOrders/MyOrders';
import ManageReviews from '../CustomerUser/Reviews/ManageReview/ManageReviews';
import AddReview from '../CustomerUser/Reviews/AddReview/AddReview';
import ProductWiseReview from '../CustomerUser/Reviews/ProductWiseReview/ProductWiseReview';
import AdminHome from '../Home/AdminHome/AdminHome';
import UserHome from '../Home/UserHome/UserHome';
import ManageOrders from '../Admin/ManageOrders/ManageOrders';
import ManageProductReview from '../CustomerUser/Reviews/ManageProductReview/ManageProductReview';
import ManageAllReviews from '../Admin/ManageAllReviews/ManageAllReviews';
import ManageProductReviews from '../Admin/ManageProductReviews/ManageProductReviews';

// https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg




  // Start Drawer Left Sidebar ...
  const drawerWidth = 230;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  });
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
// Start Drawer Left Sidebar ...

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

  const MiniDrawer = () => {
    let { path, url } = useRouteMatch();
    const {user, isAdmin, userLogoutProcess} = useAuth();
    const location = useLocation();
    const history = useHistory();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

      // User Logout Process ... 
    const handleLogoutProcess = (e) => {
        e.preventDefault();
        userLogoutProcess(location, history);
    }


    return (
      
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar 
          position="fixed" 
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              CC Splash Shutter
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ ml: "auto", display: "flex", justifyContent: "space-between" }}>

              <NavLink to="/" style={{ color: "#fff", textDecoration: "none", marginRight: "20px" }}>
                    <Button color="inherit">Home</Button>
              </NavLink>
              
              <TootTip title={user?.displayName}>
                  <CardMedia
                  component="img"
                  sx={{ width: "40px", borderRadius: "50%" }}
                  image={user?.photoURL}
                  alt="Image"
                  />
              </TootTip>

              <Button onClick={handleLogoutProcess} color="inherit">Logout</Button>

          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>

          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

          <Divider />

          {/* Left Sidebar List ... */}

          <List>
            <TootTip title="View For Dashboard">
              <NavLink to={`${url}`} style={{ color: "#000", textDecoration: "none" }}>
                <ListItem button key="">
                  <ListItemIcon>
                    <DashboardOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </NavLink>
            </TootTip>
          </List>

          <Divider />
          {
            isAdmin 
            && 
            <Box>
              <List>
                <TootTip title="View For Manage Users">
                  <NavLink to={`${url}/admins/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <AdminPanelSettingsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Users" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>          
              <Divider />
              <List>
                <TootTip title="View For Add Product">
                  <NavLink to={`${url}/admins/products/add`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <AddBoxOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Product" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <List>
                <TootTip title="View For Manage Products">
                  <NavLink to={`${url}/admins/products/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <TableChartOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Products" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <Divider />
                <List>
                <TootTip title="View For Manage Orders">
                  <NavLink to={`${url}/admins/order/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <TableChartOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Orders" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <Divider />
                <List>
                <TootTip title="View For Manage Review">
                  <NavLink to={`${url}/admins/review/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <TableChartOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Reviews" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <Divider />
              <List>
              <TootTip title="View For Manage ProductReviews">
                <NavLink to={`${url}/admins/product-review/manage`} style={{ color: "#000", textDecoration: "none" }}>
                  <ListItem button key="">
                    <ListItemIcon>
                      <BorderAllOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage ProductReviews" />
                  </ListItem>
                </NavLink>
              </TootTip>
            </List>
          </Box>
            
          } 

          <Divider />
          
          {/* Customer User List ...  */}
          {
            !isAdmin 
            &&
            <Box> 
              <List>
                <TootTip title="View For Manage MyOrders">
                  <NavLink to={`${url}/user/order/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <BorderAllOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage MyOrders" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <Divider />
              <List>
                <TootTip title="View For Add Review">
                  <NavLink to={`${url}/user/review/add`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <AddBoxOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Review" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <List>
                <TootTip title="View For Manage Reviews">
                  <NavLink to={`${url}/user/review/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <BorderAllOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Reviews" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <List>
                <TootTip title="View For Manage ProductReviews">
                  <NavLink to={`${url}/user/product-review/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <BorderAllOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage ProductReviews" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
              <Divider />
              <List>
                <TootTip title="View For Manage Payments">
                  <NavLink to={`${url}/user/payment/manage`} style={{ color: "#000", textDecoration: "none" }}>
                    <ListItem button key="">
                      <ListItemIcon>
                        <BorderAllOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Payments" />
                    </ListItem>
                  </NavLink>
                </TootTip>
              </List>
            </Box>
          }
          <Divider />


        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          {/* Loading Dynamically Main Component ...  */}
          <Switch>
            <Route exact path={`${path}`}>
              {
                isAdmin 
                ?
                <AdminHome></AdminHome>
                : 
                <UserHome></UserHome>

              }
            </Route>
            {
              isAdmin 
              && 
              <Box>
              <Route exact path={`${path}/admins/manage`}>
                <ManageUsers></ManageUsers>
              </Route>
              <Route exact path={`${path}/admins/products/add`}>
                <AddProduct></AddProduct>
              </Route>
              <Route exact path={`${path}/admins/products/manage`}>
                <ManageProducts></ManageProducts>
              </Route>
              <Route exact path={`${path}/admins/products/manage/edit/:id`}>
                <EditProduct></EditProduct>
              </Route>
              <Route exact path={`${path}/admins/order/manage`}>
                <ManageOrders></ManageOrders>
              </Route>
              <Route exact path={`${path}/admins/review/manage`}>
                <ManageAllReviews></ManageAllReviews>
              </Route>
              <Route exact path={`${path}/admins/product-review/manage`}>
                <ManageProductReviews></ManageProductReviews>
              </Route>
              </Box>
            }

            {
              !isAdmin 
              && 
              <Box>
              <Route exact path={`${path}/user/order/manage`}>
                <MyOrders></MyOrders>
              </Route>
              <Route exact path={`${path}/user/review/add`}>
                <AddReview></AddReview>
              </Route>
              <Route exact path={`${path}/user/review/manage`}>
                <ManageReviews></ManageReviews>
              </Route>
              <Route exact path={`${path}/user/order/manage/product-review/add/:id`}>
                <ProductWiseReview></ProductWiseReview>
              </Route>
              <Route exact path={`${path}/user/product-review/manage`}>
                <ManageProductReview></ManageProductReview>
              </Route>
              <Route exact path={`${path}/user/payment/manage`}>
                <ManagePayments></ManagePayments> 
              </Route>
              </Box>
            }
          </Switch>

        </Box>
      </Box>
    );

  }


export default MiniDrawer;
