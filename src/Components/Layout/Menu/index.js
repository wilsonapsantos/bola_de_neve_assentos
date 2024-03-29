import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let initialName = "W";
    let userName = localStorage.getItem('userName');
    if (userName) {
        initialName = userName.substring(0, 1)
    }
    const handleSetting = () => {
        console.log("chegou click de configuração");
        setAnchorElUser(null);
    };

    const navigate = useNavigate();

    const handleRegistration = () => {
        navigate('/Cadastro');
        setAnchorElNav(null);
    };
    const handleHome = () => {
        navigate('/');
        setAnchorElNav(null);
    };
    const handleLogout = () => {
        localStorage.clear();
        props.setAuth(false);
        navigate('/SignIn');
        setAnchorElUser(null);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                        >
                            <b>{process.env.REACT_APP_NAME_SOLUTION}</b>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                key="menu-browser"
                                id="menu-browser"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem key='menu-home' onClick={() => handleHome()}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                                <MenuItem key='menu-registration' onClick={() => handleRegistration()}>
                                    <Typography textAlign="center">Cadastro</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            {process.env.REACT_APP_NAME_SOLUTION}
                        </Typography>

                        {initialName &&
                            <>
                                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        key="menu-home"
                                        onClick={handleHome}
                                        sx={{ my: 2, color: "white", display: "block" }}
                                    >
                                        Home
                                    </Button>
                                    <Button
                                        key="menu-registration"
                                        onClick={handleRegistration}
                                        sx={{ my: 2, color: "white", display: "block" }}
                                    >
                                        Cadastro
                                    </Button>
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Abrir configurações">
                                        {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> */}
                                        <IconButton sx={{ p: 0 }}>
                                            <Avatar sx={{ width: 32, height: 32 }}>{initialName}</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        key="menu-mobile"
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem key="setting" onClick={() => handleSetting()}>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Configurações
                                        </MenuItem>
                                        <MenuItem key="logout" onClick={() => handleLogout()}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Sair
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
export default ResponsiveAppBar;
