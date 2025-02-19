import React from 'react';
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
    Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './SideBar';
import InputSearch from './InputSearch';
import IconsCartAndFavourites from './IconsCartAndFavourites';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import MyProfileButton from './MyProfileButton';
import useCheckAuth from '../hooks/useCheckAuth';

const Header = React.memo(() => {
    const store = useCheckAuth();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Container fixed>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link href="/" color="inherit" underline="none">
                                <Typography variant="h6">ХММ</Typography>
                            </Link>
                            <InputSearch />
                            <Box sx={{ flexGrow: 1 }} />
                            {store.isLoading === false ? (
                                <>
                                    {store.isAuth === false && <LoginButton />}
                                    {store.isAuth === false && <SignUpButton />}
                                    {store.isAuth === true && (
                                        <IconsCartAndFavourites />
                                    )}
                                    {store.isAuth === true && (
                                        <MyProfileButton />
                                    )}
                                </>
                            ) : (
                                <Typography> wait a second</Typography>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
                <SideBar
                    open={open}
                    onClose={toggleDrawer(false)}
                    onClick={toggleDrawer(false)}
                />
            </Box>
        </header>
    );
});

export default Header;
