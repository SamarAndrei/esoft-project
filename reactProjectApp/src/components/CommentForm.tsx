import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import React from 'react';
import CommentsService from '../service/comments';
import { CardType } from './TCard';

const CommentForm = ({ item }: { item: CardType }) => {
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');

    const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
        e.preventDefault();
        const form = e.target;
        CommentsService.sendComment(
            item.id,
            form.comment.value,
            parseFloat(form.rating.value),
        );
        setRating(0);
        setComment('');
    };

    const isFormEmpty = () => {
        return !rating || comment.trim().length <= 25;
    };
    return (
        <Box sx={{ width: 350 }}>
            <Typography variant="h6" color="inherit" gutterBottom>
                Оставьте ваш отзыв.
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
                <Box mb={2}>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={e => setRating(parseFloat(e.target.value))}
                        precision={0.5}
                        size="large"
                    />
                </Box>
                <TextField
                    name="comment"
                    label="Ваш комментарий (от 25 символов)."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isFormEmpty()}
                    >
                        Отправить отзыв
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CommentForm;
