import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { useGetCartItemsQuery } from '../store/cartApi';

const IconsCartAndFavourites = () => {
    // const cartList = useSelector(state => state.cart);
    const favouriteList = useSelector(state => state.favourites);
    const { data = [], isLoading } = useGetCartItemsQuery();

    return (
        <div>
            <IconButton
                size="large"
                aria-label="cart "
                aria-haspopup="true"
                color="inherit"
                sx={{ mr: 1 }}
                href="/favourite"
            >
                <Badge
                    color="secondary"
                    badgeContent={favouriteList.length}
                    showZero
                >
                    <FavoriteIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                aria-label="cart "
                aria-haspopup="true"
                color="inherit"
                sx={{ mr: 1 }}
                href="/cart"
            >
                <Badge
                    color="secondary"
                    badgeContent={isLoading ? 0 : data.length}
                    showZero
                >
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </div>
    );
};

export default IconsCartAndFavourites;
