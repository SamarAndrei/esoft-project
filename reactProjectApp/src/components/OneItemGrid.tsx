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
import CommentForm from './CommentForm.js';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CardType } from './TCard.js';
import { useAddCartItemMutation } from '../store/cartApi.js';
import {
    useAddFavouriteMutation,
    useDeleteFavouriteMutation,
    useGetFavouritesQuery,
} from '../store/favouritesApi.js';
import CommentsGrid from './CommentsGrid.js';
import withDataFetching from './Preloader.js';

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

const OneItemGrid: React.FC<{ data: CardType }> = ({ data }) => {
    const [addCartItem] = useAddCartItemMutation();

    const { data: favourites = [], refetch: refetchFavourites } =
        useGetFavouritesQuery();
    const [addFavorite] = useAddFavouriteMutation();
    const [deleteFavourite] = useDeleteFavouriteMutation();

    const existInFavouriteList = favourites.some(
        (item: { id: number }) => item.id === data.id,
    );

    const handleClickDeleteFromFavorite = async (id: number) => {
        await deleteFavourite(id).unwrap();
        await refetchFavourites();
    };
    const handleClickAddToFavorite = async (id: number) => {
        await addFavorite(id).unwrap();
        await refetchFavourites();
    };

    const handleClickCart = async (id: number) => {
        await addCartItem(id);
    };

    const EnhancedCommentsGrid = withDataFetching(
        `https://esoft-project-app-api.onrender.com/${data.id}/comments`,
    )(CommentsGrid);

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
                                value={data.averageRating}
                                readOnly
                            />
                            <GridContent>
                                {existInFavouriteList ? (
                                    <IconButton
                                        size="large"
                                        aria-label="cart "
                                        aria-haspopup="true"
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                        onClick={() =>
                                            handleClickDeleteFromFavorite(
                                                data.id,
                                            )
                                        }
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        size="large"
                                        aria-label="cart "
                                        aria-haspopup="true"
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                        onClick={() =>
                                            handleClickAddToFavorite(data.id)
                                        }
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                )}
                                <IconButton
                                    size="large"
                                    aria-label="cart "
                                    aria-haspopup="true"
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                    onClick={() => handleClickCart(data.id)}
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
                    <EnhancedCommentsGrid />
                </div>
            </Grid>
        </Container>
    );
};

export default OneItemGrid;
