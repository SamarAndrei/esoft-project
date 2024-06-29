import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
    styled,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import {
    аddToFavorite,
    deleteFromFavorite,
} from '../../store/favouriteActions.js';
import { аddToCart } from '../../store/cartActions.js';

type CardType = {
    id: number;
    name: string;
    desc: string;
    rating: number;
    img: string[];
};

const StyledCardMedia = styled(CardMedia)(() => ({
    paddingTop: '56.25%',
    height: 200,
}));

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
}));

const MainCard = ({ card }: { card: CardType }) => {
    const favouriteList = useSelector(state => state.favorite);

    const dispatch = useDispatch();

    const existInFavouriteList = favouriteList.some(
        (item: { id: number }) => item.id === card.id,
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
            dispatch(deleteFromFavorite(card));
        } else {
            setFavorite(true);
            dispatch(аddToFavorite(card));
        }
    };

    const handleClickCart = () => {
        dispatch(аddToCart(card));
    };

    return (
        <Card>
            <StyledCardMedia image={`${card.img[0]}`} title={`${card.name}`} />
            <StyledCardContent>
                <Typography variant="h5" gutterBottom>
                    {card.name}
                </Typography>
                <Typography>{card.desc}</Typography>
                <CardActions>
                    <Link to={`/item/${card.id}`}>
                        <Button size="small" color="primary">
                            Подробнее
                        </Button>
                    </Link>
                    <IconButton
                        size="large"
                        aria-label="add item in cart"
                        aria-haspopup="false"
                        color="inherit"
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
                        aria-label="add item in cart"
                        aria-haspopup="false"
                        color="inherit"
                        onClick={handleClickCart}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </StyledCardContent>
        </Card>
    );
};

export default MainCard;
