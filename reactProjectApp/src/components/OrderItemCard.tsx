import { CardType } from './TCard';
import {
    ButtonBase,
    Grid,
    Paper,
    Typography,
    styled,
    Button,
} from '@mui/material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const OrderItemCard = ({ item }: { item: CardType }) => {
    return (
        <Paper
            key={item.id}
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
                <Grid item>
                    <ButtonBase
                        sx={{ width: 100, height: 120 }}
                        href={`/item/${item.id}`}
                    >
                        <Img
                            alt={`${item.brand} ${item.type}`}
                            src={item.img[0]}
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                {`${item.brand} ${item.type}`}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {item.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                href={`/item/${item.id}`}
                                size="small"
                                color="primary"
                            >
                                Подробнее
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            Цена: {item.price} рублей
                        </Typography>
                        <Typography>Количество: {item.quantity}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderItemCard;
