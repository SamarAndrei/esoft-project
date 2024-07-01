import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';

const IconsCartAndFavourites = () => {
    const cartList = useSelector(state => state.cart);
    const favouriteList = useSelector(state => state.favourites);

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
                    badgeContent={cartList.length}
                    showZero
                >
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </div>
    );
};

export default IconsCartAndFavourites;
