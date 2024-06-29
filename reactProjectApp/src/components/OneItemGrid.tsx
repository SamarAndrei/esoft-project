import {
    Container,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Rating,
    Typography,
    styled,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentForm from './CommentForm';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {
    аddToFavorite,
    deleteFromFavorite,
} from '../../store/favouriteActions.js';
import { аddToCart } from '../../store/cartActions.js';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
};

const cards = [
    {
        id: 1,
        brand: 'nike',
        price: 42000,
        type: 'Max Brandt',
        desc: 'лох',
        rating: 1.5,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLABG703402_22525446_1_v1.jpg',
        ],
    },
    {
        id: 2,
        brand: 'nike',
        price: 204124,
        type: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 3,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLADK756001_23365326_1_v1_2x.jpg',
        ],
    },
    {
        id: 3,
        brand: 'nike',
        price: 203410,
        type: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 1,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLADH862301_22506711_1_v1.jpg',
        ],
    },
    {
        id: 4,
        brand: 'nike',
        price: 201200,
        type: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 4,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLACZ451202_22685691_1_v1.jpg',
        ],
    },
    {
        id: 5,
        brand: 'nike',
        price: 200120,
        type: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 2,
        img: [
            'https://a.lmcdn.ru/img389x562/M/P/MP002XW01ENA_23105387_1_v1_2x.jpg',
        ],
    },
    {
        id: 6,
        brand: 'nike',
        price: 20003,
        type: 'Кеды',
        desc: 'кеды фирмы хасбик',
        rating: 2,
        img: [
            'https://a.lmcdn.ru/img389x562/R/T/RTLADC097201_21676660_1_v1_2x.jpg',
            'https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg',
            'https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg',
            'https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg',
        ],
    },
];

const GridContent = styled('div')(() => ({
    position: 'relative',
    marginTop: 30,
}));

const OneItemGrid = () => {
    const { itemId } = useParams();
    const card = cards.filter(item => item.id === parseInt(itemId as string));

    const favouriteList = useSelector(state => state.favorite);

    const dispatch = useDispatch();

    const existInFavouriteList = favouriteList.some(
        (item: { id: number }) => item.id === card[0].id,
    );

    const [favorite, setFavorite] = React.useState(false);

    React.useEffect(() => {
        if (existInFavouriteList) {
            setFavorite(true);
        } else {
            setFavorite(false);
        }
    }, [existInFavouriteList]);

    const handleClickFavorite = () => {
        if (favorite) {
            setFavorite(false);
            dispatch(deleteFromFavorite(card[0]));
        } else {
            setFavorite(true);
            dispatch(аddToFavorite(card[0]));
        }
    };

    const handleClickCart = () => {
        dispatch(аddToCart(card[0]));
    };

    return (
        <Container fixed sx={{ marginTop: 8 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <div>
                        <ImageList
                            sx={{
                                width: 500,
                                height: 'auto',
                                overflow: 'hidden',
                            }}
                            variant="quilted"
                            cols={4}
                            rowHeight={155}
                        >
                            {card.map(item =>
                                item.img.map((imgSrc, index) => (
                                    <ImageListItem
                                        key={index}
                                        cols={index === 0 ? 3 : 1}
                                        rows={index === 0 ? 3 : 1}
                                    >
                                        <img
                                            {...srcset(imgSrc, 121)}
                                            alt={`${item.brand} ${item.type}`}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                )),
                            )}
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <GridContent>
                        {card.map(item => (
                            <div key={item.id}>
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color="inherit"
                                    gutterBottom
                                >
                                    {`${item.type} ${item.brand}`}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color="inherit"
                                    paragraph
                                >
                                    {`Цена: ${item.price} рублей`}
                                </Typography>
                                <Rating
                                    name="read-only"
                                    precision={0.5}
                                    value={item.rating}
                                    readOnly
                                />
                                <GridContent>
                                    <IconButton
                                        size="large"
                                        aria-label="cart "
                                        aria-haspopup="true"
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                        onClick={handleClickFavorite}
                                    >
                                        {favorite && existInFavouriteList ? (
                                            <FavoriteIcon />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        aria-label="cart "
                                        aria-haspopup="true"
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                        onClick={handleClickCart}
                                    >
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                </GridContent>
                            </div>
                        ))}
                    </GridContent>
                </Grid>
            </Grid>
            <Grid container justifyContent="left" mt={4}>
                {card.map(item => (
                    <div key={item.id}>
                        <Typography
                            component="h1"
                            variant="h4"
                            color="inherit"
                            gutterBottom
                        >
                            Описание
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {`${item.desc}`}
                        </Typography>
                        <CommentForm item={card} />
                    </div>
                ))}
            </Grid>
        </Container>
    );
};

export default OneItemGrid;
