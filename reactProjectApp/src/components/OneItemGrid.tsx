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

const GridContent = styled('div')(() => ({
    position: 'relative',
    marginTop: 30,
}));

type CardType = {
    id: number;
    brand: string;
    size: string[];
    type: string;
    description: string;
    img: string[];
    price: number;
    stock_quantity: number;
    gender: string;
};

const OneItemGrid: React.FC<{ data: CardType }> = ({ data }) => {
    const favouriteList = useSelector(state => state.favorite);

    const dispatch = useDispatch();

    const existInFavouriteList = favouriteList.some(
        item => item.id === data.id,
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
            dispatch(deleteFromFavorite(data));
        } else {
            setFavorite(true);
            dispatch(аddToFavorite(data));
        }
    };

    const handleClickCart = () => {
        dispatch(аddToCart(data));
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
                            {data.img.map((imgSrc, index) => (
                                <ImageListItem
                                    key={index}
                                    cols={index === 0 ? 3 : 1}
                                    rows={index === 0 ? 3 : 1}
                                >
                                    <img
                                        {...srcset(imgSrc, 121)}
                                        alt={`${data.brand} ${data.type}`}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <GridContent>
                        <div key={data.id}>
                            <Typography
                                component="h1"
                                variant="h3"
                                color="inherit"
                                gutterBottom
                            >
                                {`${data.type} ${data.brand}`}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {`Цена: ${data.price} рублей`}
                            </Typography>
                            <Rating
                                name="read-only"
                                precision={0.5}
                                // value={card}                                       тут запрос на все комменты по item_id и sum(весь рейтинг/все отзывы)
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
                    </GridContent>
                </Grid>
            </Grid>
            <Grid container justifyContent="left" mt={4}>
                <div key={data.id}>
                    <Typography
                        component="h1"
                        variant="h4"
                        color="inherit"
                        gutterBottom
                    >
                        Описание
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        {`${data.description}`}
                    </Typography>
                    <CommentForm item={data} />
                </div>
            </Grid>
        </Container>
    );
};

export default OneItemGrid;
