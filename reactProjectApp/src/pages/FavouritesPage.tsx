import { Box, Container, Divider, Typography } from '@mui/material';
import { CardType } from '../components/TCard.js';
import {
    useDeleteFavouriteMutation,
    useGetFavouritesQuery,
} from '../store/favouritesApi.js';
import Spinner from '../components/Spinner.js';
import CartAndFavouritesCard from '../components/CartAndFavouritesCard.js';

const FavouritesPage = () => {
    const {
        data: favourites = [],
        isLoading,
        refetch,
    } = useGetFavouritesQuery();

    const [deleteFavourite] = useDeleteFavouriteMutation();

    const handleClickFavorite = async (id: number) => {
        await deleteFavourite(id);
        await refetch();
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
                {isLoading ? (
                    <Spinner />
                ) : favourites != [] ? (
                    favourites.map((card: CardType) => (
                        <CartAndFavouritesCard
                            card={card}
                            onClick={handleClickFavorite}
                        />
                    ))
                ) : (
                    <Typography>Избранное пусто</Typography>
                )}
            </Container>
        </Box>
    );
};

export default FavouritesPage;
