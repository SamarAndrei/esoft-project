import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography, styled } from '@mui/material';
import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from './Fallback';
// import Preloader from './Preloader';

import withDataFetching from './Preloader';
import ProductionGrid from './ProductionGrid';

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(8),

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: "url(https://presentmoment.ru/wp-content/uploads/2022/12/section-blockquote3.jpg)" 
}));

const PaperContent = styled("div")(({ theme }) => ({
    position: "relative",
    padding: theme.spacing(15),
    marginTop: theme.spacing(5)
}));

const Overlay = styled("div")(({ theme }) => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,.3)"
}));

const Body = () => {

    const [openWinAbout, setOpenWinAbout] = React.useState(false);

    const handleClickWinAbout = (newOpen: boolean) => {
    setOpenWinAbout(newOpen);
    }

    return (
        <body>
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
                                <Typography
                                variant="h5"
                                color="inherit"
                                paragraph
                                >
                                    Откройте двери к стилю с нашим разнообразием модной одежды, где каждый найдет что-то особенное для своего гардероба.
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={() => handleClickWinAbout(true)} >
                                    Узнать больше
                                </Button>

                                <Dialog open={openWinAbout} onClose={() => handleClickWinAbout(false)} aria-label='form-dialog-login'>
                                    <DialogTitle id='form-dialog-login'>О нас</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                        Добро пожаловать в мир уникальных находок и неповторимых впечатлений! Наш веб-магазин - это оазис стиля и креатива, 
                                        где каждый найдет что-то особенное для себя. Погрузитесь в море вдохновения, перелистывая страницы нашего сайта, 
                                        где царит атмосфера уюта и удивления. От модных трендов до редких эксклюзивов - мы собрали все самое интересное и необычное на 
                                        наших виртуальных полках. Наши цены приятно удивят, а качество товаров порадует ваш взор и душу. Доверьтесь нашему опыту и стильному 
                                        вкусу - мы знаем, как сделать вашу покупку поистине незабываемой! Загляните к нам снова и снова - ведь каждый раз мы готовы удивлять и 
                                        вдохновлять вас новыми сокровищами!
                                        </DialogContentText>
                                        
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => handleClickWinAbout(false)} variant="outlined" color='primary'>Ок</Button>
                                    </DialogActions>
                                </Dialog>

                            </PaperContent>
                        </Grid>
                    </Grid>
                </Container>
            </StyledPaper>
            <div>
                <Container maxWidth="xl"> 
                    <Typography variant="h2" align="center" color="textPrimary" gutterBottom>ХасбикМегаМаркет</Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>Добро пожаловать в наш магазин одежды, где каждая штука — это история стиля и комфорта. 
                    Мы предлагаем широкий выбор моделей, от классики до современных трендов, чтобы каждый клиент мог найти идеальное сочетание для своего стиля. Наша цель — 
                    не просто продать одежду, а помочь каждому человеку выразить свою уникальность через моду и создать неповторимый образ. Здесь вы найдете не только 
                    качественные материалы и стильные дизайны, но и внимательное обслуживание, которое поможет вам сделать правильный выбор. Добро пожаловать в мир стиля и элегантности!
                    </Typography>
                </Container>
            </div>
            <ErrorBoundary 
            FallbackComponent={Fallback}
            >
                <EnhancedProductionGrid/>
            </ErrorBoundary>
        </body>
    );
};

const EnhancedProductionGrid = withDataFetching()(ProductionGrid);
export default Body;