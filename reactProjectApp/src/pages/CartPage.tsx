import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, ButtonBase, Rating, Container, Divider, Grid, Paper, Typography, styled, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const cards = [
    {id: 1, brand: "nike", price: 42000, type: "Max Brandt", desc: "лох", rating: 1.5, img:["https://a.lmcdn.ru/img389x562/R/T/RTLABG703402_22525446_1_v1.jpg"]},
    {id: 2, brand: "nike", price: 204124, type: "Кеды", desc: "кеды фирмы хасбик", rating: 3, img:["https://a.lmcdn.ru/img389x562/R/T/RTLADK756001_23365326_1_v1_2x.jpg"]},
    {id: 3, brand: "nike", price: 203410, type: "Кеды", desc: "кеды фирмы хасбик", rating: 1, img:["https://a.lmcdn.ru/img389x562/R/T/RTLADH862301_22506711_1_v1.jpg"]},
    {id: 4, brand: "nike", price: 201200, type: "Кеды", desc: "кеды фирмы хасбик", rating: 4, img:["https://a.lmcdn.ru/img389x562/R/T/RTLACZ451202_22685691_1_v1.jpg"]},
    {id: 5, brand: "nike", price: 200120, type: "Кеды", desc: "кеды фирмы хасбик", rating: 2, img:["https://a.lmcdn.ru/img389x562/M/P/MP002XW01ENA_23105387_1_v1_2x.jpg"]},
    {id: 6, brand: "nike", price: 20003, type: "Кеды", desc: "кеды фирмы хасбик", rating: 2, img:["https://a.lmcdn.ru/img389x562/R/T/RTLADC097201_21676660_1_v1_2x.jpg",
        "https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg","https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg",
        "https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg"
  ]}];

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const CartPage = () => {
    return (
        <main>
            <Header/>
            <Box sx={{ flexGrow: 1 }}>
                <Container fixed sx={{marginTop: 10}}>
                    <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                    >
                        Корзина
                    </Typography>
                    <Divider/>
                        {cards.map(card => (
                            <Paper
                            key={card.id}
                            sx={{
                                
                              p: 2,
                              marginTop: 4,
                              maxWidth: 500,
                              flexGrow: 1,
                              backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item>
                                <ButtonBase sx={{ width: 100, height: 120 }} href={`/item/${card.id}`}>
                                  <Img alt={`${card.brand} ${card.type}`} src={card.img[0]} />
                                </ButtonBase>
                              </Grid>
                              <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                  <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {`${card.brand} ${card.type}`}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {card.desc}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <Rating size='small' name="read-only" precision={0.5} value={card.rating} readOnly />
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Button href={`/item/${card.id}`}size='small' color='primary'>
                                        Подробнее
                                    </Button>
                                    <IconButton
                                    size="small"
                                    aria-label="delete item"
                                    aria-haspopup="false"
                                    color="error"
                                    sx={{mr: 1, marginLeft: 1}}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Typography variant="subtitle1" component="div">
                                    Цена: {card.price} рублей
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}
                        <Divider sx={{marginTop: 4}}/>
                        <Typography
                        variant="h5"
                        color="inherit"
                        gutterBottom
                        >
                            Итого
                        </Typography>
                        <Button size='large' color='secondary' variant='contained'>
                            Перейти к оплате
                        </Button>
                </Container>
            </Box>
            <Footer/>
        </main>
    );
};

export default CartPage;