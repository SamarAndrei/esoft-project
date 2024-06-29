import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from '@mui/material';
import validator from 'validator';

const LoginButton = () => {
    const [openWinLogin, setOpenWinLogin] = React.useState(false);

    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');

    const handleClickWinLogIn = (newOpen: boolean) => {
        setLoginEmail('');
        setLoginPassword('');
        setOpenWinLogin(newOpen);
    };

    const isLoginFieldsFilled =
        loginEmail && loginPassword && validator.isEmail(loginEmail);

    return (
        <Box mr={1}>
            <Button
                color="inherit"
                variant="outlined"
                onClick={() => handleClickWinLogIn(true)}
            >
                Войти
            </Button>
            <Dialog
                open={openWinLogin}
                onClose={() => handleClickWinLogIn(false)}
                aria-label="form-dialog-login"
            >
                <DialogTitle id="form-dialog-login">Вход</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Войдите, чтобы делать покупки
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        onChange={e => setLoginEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pass"
                        label="Пароль"
                        type="password"
                        fullWidth
                        onChange={e => setLoginPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleClickWinLogIn(false)}
                        variant="outlined"
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={() => handleClickWinLogIn(false)}
                        variant="contained"
                        color="secondary"
                        disabled={!isLoginFieldsFilled}
                    >
                        Войти
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LoginButton;
