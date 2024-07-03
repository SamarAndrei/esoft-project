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
import {
    useAddFavouriteMutation,
    useDeleteFavouriteMutation,
    useGetFavouritesQuery,
} from '../store/favouritesApi.ts';
import { CardType } from './TCard.js';
import { useAddCartItemMutation, useGetCartItemsQuery } from '../store/cartApi.ts';

const StyledCardMedia = styled(CardMedia)(() => ({
    paddingTop: '56.25%',
    height: 200,
}));

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
}));

const MainCard = ({ card }: { card: CardType }) => {
    const [addCartItem] = useAddCartItemMutation();

    const { data = [], refetch: refetchFavourites } = useGetFavouritesQuery();
    const [addFavorite] = useAddFavouriteMutation();
    const [deleteFavourite] = useDeleteFavouriteMutation();

    const existInFavouriteList = data.some(
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

    const handleClickFavorite = async (id: number) => {
        if (favorite) {
            setFavorite(false);
            await deleteFavourite(id).unwrap();
            await refetchFavourites();
        } else {
            setFavorite(true);
            await addFavorite(id).unwrap();
            await refetchFavourites();

        }
    };

    const handleClickCart = async (id: number) => {
        await addCartItem(id).unwrap();
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
                        onClick={() => handleClickFavorite(card.id)}
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
