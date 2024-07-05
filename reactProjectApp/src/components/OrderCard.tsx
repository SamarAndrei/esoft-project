import { Button, Grid, Paper, Typography } from '@mui/material';
import { TOrder } from '../models/TOrder';

const dateRegex = /\d{4}-\d{2}-\d{2}/;


const OrderCard = ({ order }: { order: TOrder }) => {
    return (
        <Paper
            key={order.id}
            sx={{
                p: 2,
                marginTop: 4,
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: theme =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                Создан:
                                {` ${order.createdAt.match(dateRegex)}`}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                Последнее изменение:
                                {` ${order.createdAt.match(dateRegex)}`}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                Статус:
                                {` ${order.status}`}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Button
                                href={`/orders/${order.id}`}
                                size="small"
                                color="primary"
                            >
                                Подробнее
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderCard;
