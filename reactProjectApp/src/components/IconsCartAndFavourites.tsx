import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGetCartItemsQuery } from '../store/cartApi';
import { useGetFavouritesQuery } from '../store/favouritesApi';

const IconsCartAndFavourites = () => {
    const { data: favourites = [], isLoading: isLoadingFavourites } =
        useGetFavouritesQuery();

    const { data: cartItems = [], isLoading: isLoadingCart } =
        useGetCartItemsQuery();

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
                    badgeContent={isLoadingFavourites ? 0 : favourites.length}
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
                    badgeContent={
                        isLoadingCart && cartItems ? 0 : cartItems.length
                    }
                    showZero
                >
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </div>
    );
};

export default IconsCartAndFavourites;
