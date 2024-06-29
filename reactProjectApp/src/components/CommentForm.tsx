import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import React from 'react';

const CommentForm = ({ item }) => {
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');

    const handleRatingChange = (
        e: React.SyntheticEvent<Element, Event>,
        newValue: number,
    ) => {
        setRating(newValue);
    };

    const handleCommentChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
        e.preventDefault();
        const form = e.target;

        console.log('Rating:', parseFloat(rating));
        console.log('Comment:', comment);
        console.log('Id:', item[0].id);
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
                        onChange={e => handleRatingChange(e, e.target.value)}
                        precision={0.5}
                        size="large"
                    />
                </Box>
                <TextField
                    label="Ваш комментарий (от 30 символов)."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={comment}
                    onChange={e => handleCommentChange(e)}
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
