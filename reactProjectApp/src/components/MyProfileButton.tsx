import React from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useAnyFieldsFilled } from '../hooks/useAnyFieldsFilled';
import UserService from '../service/userService';
const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';

const MyProfileButton = () => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const [errors, setErrors] = React.useState('');

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        handleClickWinUpdateProfile(true);
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [openWinUpdateProfile, setopenWinUpdateProfile] =
        React.useState(false);

    const handleClickWinUpdateProfile = (newOpen: boolean) => {
        setUpdatepName('');
        setUpdateEmail('');
        setUpdatePassword('');
        setopenWinUpdateProfile(newOpen);
    };

    const handleClickWinUpdateProfileChange = () => {
        handleClickWinUpdateConfirm(true);
    };

    const handleClickWinUpdateConfirm = (newOpen: boolean) => {
        setOpenWinUpdateConfirm(newOpen);
    };

    const handleClickUpdateConfirm = async (newOpen: boolean) => {
        let userData = {};
        if (updatepName != '') {
            userData.name = updatepName;
        }

        if (updateEmail != '') {
            userData.email = updateEmail;
        }

        if (updatePassword != '') {
            userData.password = updatePassword;
        }

        if (userData != []) {
            console.log(userData);
        }

        await UserService.putUser(userData).catch(() => setErrors(true));
        setOpenWinUpdateConfirm(newOpen);
        setopenWinUpdateProfile(newOpen);
    };

    const handleClickWinUpdateCancel = (newOpen: boolean) => {
        setOpenWinUpdateConfirm(newOpen);
    };

    const [updatepName, setUpdatepName] = React.useState('');
    const [updateEmail, setUpdateEmail] = React.useState('');
    const [updatePassword, setUpdatePassword] = React.useState('');

    const [openWinUpdateConfirm, setOpenWinUpdateConfirm] =
        React.useState(false);

    const isUpdateFieldsFilled = useAnyFieldsFilled(
        updateEmail,
        updatePassword,
        updatepName,
    );

    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    return (
        <div>
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
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleMenuClose}>Мой аккаунт</MenuItem>
                <Dialog
                    open={openWinUpdateProfile}
                    onClose={() => handleClickWinUpdateProfile(false)}
                    aria-label="form-dialog-login"
                >
                    <DialogTitle id="form-dialog-login">
                        Ваши данные
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            У вас есть возможность их изменить
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ваше имя"
                            type="name"
                            fullWidth
                            onChange={e => setUpdatepName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            onChange={e => setUpdateEmail(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pass"
                            label="Пароль"
                            type="password"
                            fullWidth
                            onChange={e => setUpdatePassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleClickWinUpdateProfile(false)}
                            variant="outlined"
                            color="primary"
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={() => handleClickWinUpdateProfileChange()}
                            variant="contained"
                            color="secondary"
                            disabled={!isUpdateFieldsFilled}
                        >
                            Изменить
                        </Button>
                        <Dialog
                            open={openWinUpdateConfirm}
                            onClose={() => handleClickWinUpdateConfirm(false)}
                            aria-labelledby="alert-dialog-confirm-update"
                        >
                            <DialogTitle>Подтверждение</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Вы согласны изменить данные?
                                </DialogContentText>
                                {errors && (
                                    <DialogContentText color="red">
                                        Ошибка. Скорее всего с этим емейлом кто
                                        то уже зарегистрирован
                                    </DialogContentText>
                                )}
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() =>
                                        handleClickWinUpdateCancel(false)
                                    }
                                >
                                    Отмена
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleClickUpdateConfirm(false)
                                    }
                                    autoFocus
                                >
                                    Да
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </DialogActions>
                </Dialog>
                <Link href="/orders" color="inherit" underline="none">
                    <MenuItem>Мои заказы</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </div>
    );
};

export default MyProfileButton;
