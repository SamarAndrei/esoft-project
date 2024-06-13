import { Button, Card, CardActions, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Pagination, Paper, Stack, Typography, styled } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';




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

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    paddingTop: "56.25%",
    height:200
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    flexGrow: 1,
}));

const cards = [
{id: 1, name: "Max Brandt", desc: "лох", rating: 0, img:"https://a.lmcdn.ru/img389x562/R/T/RTLABG703402_22525446_1_v1.jpg"},
{id: 2, name: "Кеды", desc: "кеды фирмы хасбик", rating: 3, img:"https://a.lmcdn.ru/img389x562/R/T/RTLADK756001_23365326_1_v1_2x.jpg"},
{id: 3, name: "Кеды", desc: "кеды фирмы хасбик", rating: 1, img:"https://a.lmcdn.ru/img389x562/R/T/RTLADH862301_22506711_1_v1.jpg"},
{id: 4, name: "Кеды", desc: "кеды фирмы хасбик", rating: 4, img:"https://a.lmcdn.ru/img389x562/R/T/RTLACZ451202_22685691_1_v1.jpg"},
{id: 5, name: "Кеды", desc: "кеды фирмы хасбик", rating: 2, img:"https://a.lmcdn.ru/img389x562/M/P/MP002XW01ENA_23105387_1_v1_2x.jpg"},
{id: 6, name: "Кеды", desc: "кеды фирмы хасбик", rating: 2, img:"https://a.lmcdn.ru/img389x562/R/T/RTLADC097201_21676660_1_v1_2x.jpg"},
];

const Body = () => {

    const [openWinAbout, setOpenWinAbout] = React.useState(false);

    const handleClickWinAbout = (newOpen: boolean) => {
    setOpenWinAbout(newOpen);
    }

    return (
        <main>
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
            <Container sx={{marginTop: 8}}>
                <Grid container spacing={4}>
                    {cards.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <StyledCardMedia 
                                image= {`${card.img}`}
                                title={`${card.name}`}/>
                                <StyledCardContent>
                                    <Typography variant='h5' gutterBottom>{card.name}</Typography>
                                    <Typography>{card.desc}</Typography>
                                    <CardActions>
                                    <Link to={`/item/${card.id}`}>
                                        <Button size='small' color='primary'>Подробнее</Button>
                                    </Link>
                                        <IconButton 
                                        size="large"
                                        aria-label="add item in cart"
                                        aria-haspopup="false"
                                        color="inherit">
                                            <FavoriteIcon/>
                                        </IconButton>
                                        <IconButton 
                                        size="large"
                                        aria-label="add item in cart"
                                        aria-haspopup="false"
                                        color="inherit">
                                            <AddShoppingCartIcon/>
                                        </IconButton>
                                    </CardActions>
                                </StyledCardContent>
                            </Card>

                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Grid container justifyContent="center" mt={4}>
                <Stack spacing={2}>
                    <Pagination count={10}/>
                </Stack>
            </Grid>

        </main>
    );
};

export default Body;