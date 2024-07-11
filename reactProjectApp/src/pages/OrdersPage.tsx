import { Box, Container, Divider, Typography } from '@mui/material';
import { useGetOrdersQuery } from '../store/ordersApi';
import { TOrder } from '../models/TOrder';
import Spinner from '../components/Spinner';
import OrderCard from '../components/OrderCard';

const dateRegex = /\d{4}-\d{2}-\d{2}/;

const OrdersPage = () => {
    const { data = [], isLoading } = useGetOrdersQuery();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container fixed sx={{ marginTop: 10 }}>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                >
                    Заказы
                </Typography>
                <Divider />
                {isLoading ? (
                    <Spinner />
                ) : (
                    data.map((order: TOrder) => <OrderCard order={order} />)
                )}
            </Container>
        </Box>
    );
};

export default OrdersPage;
