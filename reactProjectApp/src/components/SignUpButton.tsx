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
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { registration } from '../store/userSlice';
import useValidateFields from './hooks/useValidateFields';

const SignUpButton = () => {
    const dispatch = useDispatch();

    const [openSignup, setOpenSignup] = React.useState(false);

    const [signupName, setSignupName] = React.useState('');
    const [signupEmail, setSignupEmail] = React.useState('');
    const [signupPassword, setSignupPassword] = React.useState('');

    const [error, setError] = React.useState(false);

    const handleClickSignUp = (newOpen: boolean) => {
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setError(false);
        setOpenSignup(newOpen);
    };
    const isSignupFieldsFilled = useValidateFields(
        signupEmail,
        signupPassword,
        signupName,
    );

    const handleClickSignUpComplete = () => {
        try {
            dispatch(
                registration({
                    name: signupName,
                    email: signupEmail,
                    password: signupPassword,
                }),
            );
        } catch {
            setError(true);
        }
    };

    return (
        <Box mr={1}>
            <Button
                color="secondary"
                variant="contained"
                onClick={() => handleClickSignUp(true)}
            >
                Регистрация
            </Button>
            <Dialog
                open={openSignup}
                onClose={() => handleClickSignUp(false)}
                aria-label="form-dialog-login"
            >
                <DialogTitle id="form-dialog-login">Регистрация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Зарегистрируйтесь, чтобы делать покупки
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Ваше имя"
                        type="name"
                        fullWidth
                        onChange={e => setSignupName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        onChange={e => setSignupEmail(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pass"
                        label="Пароль"
                        type="password"
                        fullWidth
                        onChange={e => setSignupPassword(e.target.value)}
                    />
                    {error && (
                        <Typography
                            align="center"
                            sx={{ marginTop: 1 }}
                            color="red"
                        >
                            Ошибка при регистрации
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => handleClickSignUp(false)}
                        variant="outlined"
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={() => handleClickSignUpComplete()}
                        variant="contained"
                        color="secondary"
                        disabled={!isSignupFieldsFilled}
                    >
                        Зарегистрироваться
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SignUpButton;
