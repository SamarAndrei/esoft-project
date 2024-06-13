import React from 'react';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography, styled, alpha, InputBase, Drawer, List, ListItem, ListItemText, ListItemButton, Divider, ListItemIcon, Badge, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

    const [openWinLogin, setOpenWinLogin] = React.useState(false);

    const handleClickWinLogIn = (newOpen: boolean) => {
        setOpenWinLogin(newOpen);
    }

    const [openSignup, setOpenSignup] = React.useState(false);

    const handleClickSignUp = (newOpen: boolean) => {
        setOpenSignup(newOpen);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
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
                    <Link href='/' color='inherit' underline='none'>
                        <Typography variant='h6'>ХасбикМегаМаркет</Typography>
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Поиск"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton 
                    size="large"
                    aria-label="cart "
                    aria-haspopup="true"
                    color="inherit"
                    sx={{mr: 1}}
                    href='/favourite'
                    >
                        <Badge color="secondary" badgeContent={3} showZero>
                            <FavoriteIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton 
                    size="large"
                    aria-label="cart "
                    aria-haspopup="true"
                    color="inherit"
                    sx={{mr: 1}}
                    href='/cart'
                    >
                        <Badge color="secondary" badgeContent={3} showZero>
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>
                    <Box mr={1}>
                        <Button color="inherit" variant="outlined" onClick={() => handleClickWinLogIn(true)}>Войти</Button>
                        <Dialog open={openWinLogin} onClose={() => handleClickWinLogIn(false)} aria-label='form-dialog-login'>
                            <DialogTitle id='form-dialog-login'>Вход</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Войдите, чтобы делать покупки</DialogContentText>
                                <TextField 
                                autoFocus
                                margin='dense'
                                id='email'
                                label='email'
                                type='email'
                                fullWidth
                                />
                                <TextField 
                                autoFocus
                                margin='dense'
                                id='pass'
                                label='password'
                                type='password'
                                fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClickWinLogIn(false)} variant="outlined" color='primary'>Отмена</Button>
                                <Button onClick={() => handleClickWinLogIn(false)} variant="contained" color='secondary'>Войти</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box mr={1}>
                        <Button color="secondary" variant="contained" onClick={() => handleClickSignUp(true)}>Регистрация</Button>
                        <Dialog open={openSignup} onClose={() => handleClickSignUp(false)} aria-label='form-dialog-login'>
                            <DialogTitle id='form-dialog-login'>Регистрация</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Зарегистрируйтесь, чтобы делать покупки</DialogContentText>
                                <TextField 
                                autoFocus
                                margin='dense'
                                id='name'
                                label='Ваше имя'
                                type='name'
                                fullWidth
                                />
                                <TextField 
                                autoFocus
                                margin='dense'
                                id='email'
                                label='email'
                                type='email'
                                fullWidth
                                />
                                <TextField 
                                autoFocus
                                margin='dense'
                                id='pass'
                                label='Пароль'
                                type='password'
                                fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClickSignUp(false)} variant="outlined" color='primary'>Отмена</Button>
                                <Button onClick={() => handleClickSignUp(false)} variant="contained" color='secondary'>Зарегистрироваться</Button>
                            </DialogActions>
                        </Dialog>

                    </Box>
                    <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: 'top',
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
        </Menu>
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
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
            <MenuItem onClick={handleMenuClose}>Мой аккаунт</MenuItem>
            <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
        </Menu>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    </Box>
    );  
};

export default Header;