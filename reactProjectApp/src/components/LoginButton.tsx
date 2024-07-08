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
    Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import useValidateFields from './hooks/useValidateFields';

const LoginButton = () => {
    const dispatch = useDispatch();

    const [openWinLogin, setOpenWinLogin] = React.useState(false);

    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');

    const [error, setError] = React.useState(false);

    const handleClickWinLogIn = (newOpen: boolean) => {
        setLoginEmail('');
        setLoginPassword('');
        setError(false);
        setOpenWinLogin(newOpen);
    };

    const isLoginFieldsFilled = useValidateFields(loginEmail, loginPassword);

    const handleClickWinLogInComplete = () => {
        try {
            dispatch(login({ email: loginEmail, password: loginPassword }));
        } catch {
            setError(true);
        }
    };

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
                    {error && (
                        <Typography
                            align="center"
                            sx={{ marginTop: 1 }}
                            color="red"
                        >
                            Ошибка при входе
                        </Typography>
                    )}
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
                        onClick={() => handleClickWinLogInComplete()}
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
