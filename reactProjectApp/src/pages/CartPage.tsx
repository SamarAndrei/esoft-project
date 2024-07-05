import { Box, Container, Divider, Typography, Button } from '@mui/material';
import {
    useAddCartItemMutation,
    useDeleteCartItemMutation,
    useGetCartItemsQuery,
} from '../store/cartApi.ts';
import { CardType } from '../components/TCard.js';
import Spinner from '../components/Spinner.tsx';
import CartAndFavouritesCard from '../components/CartAndFavouritesCard.tsx';

// const averageRating = (card, data) => {
//     let sum = 0;
//     let count = 0;

//     for (let item of data[2]) {
//         if (item.prod_id === card.id) {
//             sum += item.rating;
//             count++;
//         }
//     }

//     if (count === 0) {
//         return 0;
//     }

//     return sum / count;
// };

const CartPage = () => {
    const { data = [], isLoading, refetch } = useGetCartItemsQuery();
    const [addCartItem] = useAddCartItemMutation();
    const [deleteCartItem] = useDeleteCartItemMutation();

    const handleDeleteClickCart = async (id: number) => {
        await deleteCartItem(id).unwrap();
        await refetch();
    };

    const handleAddClickCart = async (id: number) => {
        await addCartItem(id).unwrap();
        await refetch();
    };

    if (data != 1) {
        console.log(data);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container fixed sx={{ marginTop: 10 }}>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                >
                    Корзина
                </Typography>
                <Divider />
                {isLoading ? (
                    <Spinner />
                ) : data != [] ? (
                    data.map((card: CardType) => (
                        <CartAndFavouritesCard
                            card={card}
                            onDeleteClick={handleDeleteClickCart}
                            onAddClick={handleAddClickCart}
                        />
                    ))
                ) : (
                    <Typography>Корзина пуста</Typography>
                )}
                <Divider sx={{ marginTop: 4 }} />
                <Typography variant="h5" color="inherit" gutterBottom>
                    Итого
                </Typography>
                <Button size="large" color="secondary" variant="contained">
                    Перейти к оплате
                </Button>
            </Container>
        </Box>
    );
};

export default CartPage;
