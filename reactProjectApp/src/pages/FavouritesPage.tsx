import {
    Box,
    ButtonBase,
    Rating,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
    styled,
    IconButton,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromFavorite } from '../store/favouritesSlice.ts';
import { CardType } from '../components/TCard.js';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const FavouritesPage = () => {
    const favouriteList = useSelector(state => state.favourites);
    const dispatch = useDispatch();

    const handleClickFavorite = (card: CardType) => {
        dispatch(deleteFromFavorite(card));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container fixed sx={{ marginTop: 10 }}>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                >
                    Избранное
                </Typography>
                <Divider />
                {favouriteList.map((card: CardType) => (
                    <Paper
                        key={card.id}
                        sx={{
                            p: 2,
                            marginTop: 4,
                            maxWidth: 500,
                            flexGrow: 1,
                            backgroundColor: theme =>
                                theme.palette.mode === 'dark'
                                    ? '#1A2027'
                                    : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase
                                    sx={{ width: 100, height: 120 }}
                                    href={`/item/${card.id}`}
                                >
                                    <Img
                                        alt={`${card.brand} ${card.type}`}
                                        src={card.img[0]}
                                    />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid
                                    item
                                    xs
                                    container
                                    direction="column"
                                    spacing={2}
                                >
                                    <Grid item xs>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {`${card.brand} ${card.type}`}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                        >
                                            {card.description}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            <Rating
                                                size="small"
                                                name="read-only"
                                                precision={0.5}
                                                // value={card.rating}
                                                readOnly
                                            />
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            href={`/item/${card.id}`}
                                            size="small"
                                            color="primary"
                                        >
                                            Подробнее
                                        </Button>
                                        <IconButton
                                            size="small"
                                            aria-label="delete item"
                                            aria-haspopup="false"
                                            color="error"
                                            sx={{ mr: 1, marginLeft: 1 }}
                                            onClick={handleClickFavorite(card)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Цена: {card.price} рублей
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Container>
        </Box>
    );
};

export default FavouritesPage;
