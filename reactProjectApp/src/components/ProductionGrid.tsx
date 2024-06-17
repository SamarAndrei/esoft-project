import { Button, Card, CardActions, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Pagination, Paper, Stack, Typography, styled } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

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


const ProductionGrid = (/**props с инфой об одежде из хока */) => {
    return (
        <Container id='cards' sx={{marginTop: 8}}>
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
            <Grid container justifyContent="center" mt={4}>
                <Stack spacing={2}>
                    <Pagination count={10}/>
                </Stack>
            </Grid>
        </Container>
    );
};

export default ProductionGrid;