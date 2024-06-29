import { Container, Grid, Pagination, Stack } from '@mui/material';
import MainCard from './MainCard';

const cards = [
    {
        id: 1,
        name: 'Max Brandt',
        desc: 'лох',
        rating: 0,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLABG703402_22525446_1_v1.jpg',
        ],
        quantity: 1,
    },
    {
        id: 2,
        name: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 3,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLADK756001_23365326_1_v1_2x.jpg',
        ],
        quantity: 1,
    },
    {
        id: 3,
        name: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 1,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLADH862301_22506711_1_v1.jpg',
        ],
        quantity: 1,
    },
    {
        id: 4,
        name: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 4,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLACZ451202_22685691_1_v1.jpg',
        ],
        quantity: 1,
    },
    {
        id: 5,
        name: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 2,
        img: [
            'https://a.lmcdn.ru/img389x562/M/P/MP002XW01ENA_23105387_1_v1_2x.jpg',
        ],
        quantity: 1,
    },
    {
        id: 6,
        name: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 2,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLADC097201_21676660_1_v1_2x.jpg',
        ],
        quantity: 1,
    },
];

const ProductionGrid = (/**cards с инфой об одежде из хока */) => {
    return (
        <Container id="cards" sx={{ marginTop: 8 }}>
            <Grid container spacing={4}>
                {cards.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <MainCard card={card} />
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" mt={4}>
                <Stack spacing={2}>
                    <Pagination count={10} />
                </Stack>
            </Grid>
        </Container>
    );
};

export default ProductionGrid;
