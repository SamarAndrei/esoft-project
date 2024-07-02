import React from 'react';
import {
    Box,
    ButtonBase,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from '@mui/material';

const OrdersPage = orders => {
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
                {orders.map(order => (
                    <Paper
                        key={order.id}
                        sx={{
                            p: 2,
                            marginTop: 4,
                            maxWidth: 500,
                            flexGrow: 1,
                            backgroundColor: theme =>
                                theme.palette.mode === 'dark'
                                    ? '#1A2027'
                                    : '#fff',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase
                                    sx={{ width: 100, height: 120 }}
                                    href={`/item/${order.id}`}
                                ></ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid
                                    item
                                    xs
                                    container
                                    direction="column"
                                    spacing={2}
                                >
                                    <Grid item xs>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                        >
                                            {`${order.brand} ${order.type}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                    >
                                        Цена: {order.price} рублей
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Container>
        </Box>
    );
};

export default OrdersPage;
