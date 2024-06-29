import React from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    styled,
} from '@mui/material';
import ModalWinAbout from './ModalWinAbout';

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(8),

    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage:
        'url(https://presentmoment.ru/wp-content/uploads/2022/12/section-blockquote3.jpg)',
}));

const PaperContent = styled('div')(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(15),
    marginTop: theme.spacing(5),
}));

const Overlay = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,.3)',
}));

const PaperMainPage = () => {
    const [openWinAbout, setOpenWinAbout] = React.useState(false);

    const handleClickWinAbout = (newOpen: boolean) => {
        setOpenWinAbout(newOpen);
    };

    return (
        <StyledPaper>
            <Container fixed>
                <Overlay />
                <Grid container>
                    <Grid item md={9}>
                        <PaperContent>
                            <Typography
                                component="h1"
                                variant="h3"
                                color="inherit"
                                gutterBottom
                            >
                                Магазин одежды
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                Откройте двери к стилю с нашим разнообразием
                                модной одежды, где каждый найдет что-то
                                особенное для своего гардероба.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleClickWinAbout(true)}
                            >
                                Узнать больше
                            </Button>
                            <ModalWinAbout
                                open={openWinAbout}
                                onClose={() => handleClickWinAbout(false)}
                                aria="dialog-info"
                                id="dialog-info"
                                onClick={() => handleClickWinAbout(false)}
                            />
                        </PaperContent>
                    </Grid>
                </Grid>
            </Container>
        </StyledPaper>
    );
};

export default PaperMainPage;
