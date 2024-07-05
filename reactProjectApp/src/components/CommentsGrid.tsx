import {
    Box,
    Container,
    Divider,
    Grid,
    Paper,
    Rating,
    Typography,
} from '@mui/material';
import { TComment } from '../models/TComment';
const dateRegex = /\d{4}-\d{2}-\d{2}/;

const CommentsGrid = ({ data }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container fixed sx={{ marginTop: 10 }}>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                >
                    Отзывы
                </Typography>
                <Divider />
                {data != [] ? (
                    data.map((order: TComment) => (
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
                                                Дата заказа:
                                                {` ${order.createdAt.match(dateRegex)}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Rating
                                                size="small"
                                                name="read-only"
                                                precision={0.5}
                                                value={order.rating}
                                                readOnly
                                            />
                                        </Grid>

                                        <Grid item xs>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="div"
                                            >
                                                {` ${order.comment}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography>На этот товар еще нет отзывов</Typography>
                )}
            </Container>
        </Box>
    );
};

export default CommentsGrid;
