import { CardType } from './TCard';
import { FC } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import OrderItemCard from './OrderItemCard';

const OrderItems: FC<{ data }> = ({ data }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container fixed sx={{ marginTop: 10 }}>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                >
                    Заказ
                </Typography>
                <Divider />
                {data.map((item: CardType) => (
                    <OrderItemCard item={item} />
                ))}
            </Container>
        </Box>
    );
};

export default OrderItems;
