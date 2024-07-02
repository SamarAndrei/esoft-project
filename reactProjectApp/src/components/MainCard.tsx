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
import { addToFavorite, deleteFromFavorite } from '../store/favouritesSlice.ts';
import { CardType } from './TCard.js';
import { useAddCartItemMutation } from '../store/cartApi.ts';

const StyledCardMedia = styled(CardMedia)(() => ({
    paddingTop: '56.25%',
    height: 200,
}));

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
}));

const MainCard = ({ card }: { card: CardType }) => {
    const [addToCart] = useAddCartItemMutation();

    const favouriteList = useSelector(state => state.favourites);

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
            dispatch(addToFavorite(card));
        }
    };

    const handleClickCart = async (id: number) => {
        await addToCart(id).unwrap();
    };

    return (
        <Card>
            <StyledCardMedia image={`${card.img[0]}`} title={`${card.brand}`} />
            <StyledCardContent>
                <Typography variant="h5" gutterBottom>
                    {card.brand}
                </Typography>
                <Typography>{card.description}</Typography>
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
                        onClick={() => handleClickCart(card.id)}
                    >
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </StyledCardContent>
        </Card>
    );
};

export default MainCard;
