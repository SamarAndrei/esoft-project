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

const SignUpButton = () => {
    const [openSignup, setOpenSignup] = React.useState(false);

    const [signupName, setSignupName] = React.useState('');
    const [signupEmail, setSignupEmail] = React.useState('');
    const [signupPassword, setSignupPassword] = React.useState('');

    const handleClickSignUp = (newOpen: boolean) => {
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setOpenSignup(newOpen);
    };
    const isSignupFieldsFilled =
        signupName &&
        signupEmail &&
        signupPassword &&
        validator.isEmail(signupEmail);

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
                        onClick={() => handleClickSignUp(false)}
                        variant="contained"
                        color="secondary"
                        disabled={!isSignupFieldsFilled}
                    >
                        Изменить данные
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SignUpButton;
