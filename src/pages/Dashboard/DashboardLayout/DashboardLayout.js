import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button} from '@mui/material';
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
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink
} from "react-router-dom";
import Home from '../Home/Home';
import AddProduct from '../Products/AddProduct/AddProduct';
import ManageProducts from '../Products/ManageProducts/ManageProducts';
import EditProduct from '../Products/EditProduct/EditProduct';


const drawerWidth = 220;

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

const MiniDrawer = () => {
  let { path, url } = useRouteMatch();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <Typography variant="h6" noWrap component="div" sx={{ ml: "auto" }}>
            <NavLink target="_blank" to="/" style={{ color: "#fff", textDecoration: "none" }}>
                <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink to="" style={{ color: "#fff", textDecoration: "none" }}>
                <Button  color="inherit">Logout </Button>
            </NavLink>
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
          <NavLink to={`${url}`} style={{ color: "#000", textDecoration: "none" }}>
            <ListItem button key="">
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <NavLink to={`${url}/admins/products/add`} style={{ color: "#000", textDecoration: "none" }}>
            <ListItem button key="">
              <ListItemIcon>
                <AddBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          <NavLink to={`${url}/admins/products/manage`} style={{ color: "#000", textDecoration: "none" }}>
            <ListItem button key="">
              <ListItemIcon>
                <TableChartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Product" />
            </ListItem>
          </NavLink>
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {/* Loading Dynamically Main Component ...  */}
        <Switch>
          <Route exact path={path}>
            <Home></Home>
          </Route>
          <Route exact path={`${path}/admins/products/add`}>
            <AddProduct></AddProduct>
          </Route>
          <Route exact path={`${path}/admins/products/manage`}>
            <ManageProducts></ManageProducts>
          </Route>
          <Route exact path={`${path}/admins/products/edit/:id`}>
            <EditProduct></EditProduct>
          </Route>
        </Switch>

      </Box>
    </Box>
  );

}


export default MiniDrawer;
