import React from 'react';
import { FC } from 'react';
import {
    ButtonBase,
    Rating,
    Grid,
    Paper,
    Typography,
    styled,
    IconButton,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardType } from '../components/TCard.js';

interface CartAndFavouritesCardProps {
    card: CardType;
    onClick: () => void;
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const CartAndFavouritesCard: FC<CartAndFavouritesCardProps> = ({
    card,
    onClick,
}) => {
    return (
        <Paper
            key={card.id}
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
                        href={`/item/${card.id}`}
                    >
                        <Img
                            alt={`${card.brand} ${card.type}`}
                            src={card.img[0]}
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
                                {`${card.brand} ${card.type}`}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {card.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Rating
                                    size="small"
                                    name="read-only"
                                    precision={0.5}
                                    // value={}                              отзывы
                                    readOnly
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                href={`/item/${card.id}`}
                                size="small"
                                color="primary"
                            >
                                Подробнее
                            </Button>
                            <IconButton
                                size="small"
                                aria-label="delete item"
                                aria-haspopup="false"
                                color="error"
                                sx={{ mr: 1, marginLeft: 1 }}
                                onClick={() => onClick(card.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            Цена: {card.price} рублей
                        </Typography>
                        {/* <Typography>Количество: {props.quantity}</Typography> */}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CartAndFavouritesCard;
