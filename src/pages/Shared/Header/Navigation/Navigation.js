import * as React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Badge, Container, Button } from '@mui/material';
import { Box } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from './../../../../assets/images/logo/logo_5_160x.png';
import { Link, NavLink } from 'react-router-dom';

//  Start Search bar handle process ... 
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.dark, 0.8),
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.9),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));
//  End Search bar handle process ... 

const Navigation = () => {

    // Start Menu Items with icons handle process ... 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <NavLink to="/" color="secondary"  style={{ textDecoration: "none" }}>
                    <Button color="secondary" >My Profile</Button> 
                </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} color="secondary">
                <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                    <Button color="secondary" >My Dashboard</Button>
                </NavLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <Button color="secondary" >Logout</Button>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                    <HomeOutlinedIcon />
                </IconButton>
                <p>Home</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                    <TravelExploreOutlinedIcon />
                </IconButton>
                <p>Explore</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <ShoppingCartOutlinedIcon />
                </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
        </Menu>
    );
    // End Menu Items with icons handle process ...   
         


    return (
        
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" elevation={3} sx={{ background: "#fff", padding: "10px"
    }}>
                        <Toolbar>
                            <Box sx={{ display: { md: 'flex' } }}>
                                <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
                                    <img width="150" src={logo} alt="Logo" />
                                </NavLink>
                            </Box>

                            {/* <Box sx={{ flexGrow: 1 }} /> */}

                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>

                            <Box sx={{ flexGrow: 1 }} />
                            
                            <Box sx={{ display: { xs: "none", md: 'flex' }, alignItems: "center" }}>
                                <NavLink to="/home" style={{ color: "#000", textDecoration: "none" }}>
                                    <Button color="secondary" >Home</Button>
                                </NavLink>
                                <NavLink to="/appointment" style={{ color: "#000", textDecoration: "none" }}>
                                    <Button color="secondary">Explore</Button>
                                </NavLink>
                                <NavLink to="/login" style={{ color: "#000", textDecoration: "none" }}>
                                    <Button color="secondary" >Login</Button>
                                </NavLink>
                                <NavLink to="/registration" style={{ color: "#000", textDecoration: "none" }}>
                                    <Button color="secondary">Register</Button>
                                </NavLink>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="secondary"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="secondary"
                                >
                                    <Badge badgeContent={17} color="error">
                                        <ShoppingCartOutlinedIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="secondary"
                                >
                                <MoreIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                    color="secondary"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            {renderMobileMenu}
                            {renderMenu}
                        </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
};

export default Navigation;