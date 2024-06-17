import React from 'react';
import { Box, Button, Container, Grid, IconButton, ImageList, ImageListItem, Rating, TextField, Typography, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const cards = [
    {id: 1, brand: "nike", price: 42000, type: "Max Brandt", desc: "лох", rating: 1.5, img:["https://a.lmcdn.ru/img389x562/R/T/RTLABG703402_22525446_1_v1.jpg"]},
    {id: 2, brand: "nike", price: 204124, type: "Кеды", desc: "кеды фирмы хасбик", rating: 3, img:["https://a.lmcdn.ru/img389x562/R/T/RTLADK756001_23365326_1_v1_2x.jpg"]},
    {id: 3, brand: "nike", price: 203410, type: "Кеды", desc: "кеды фирмы хасбик", rating: 1, img:["https://a.lmcdn.ru/img389x562/R/T/RTLADH862301_22506711_1_v1.jpg"]},
    {id: 4, brand: "nike", price: 201200, type: "Кеды", desc: "кеды фирмы хасбик", rating: 4, img:["https://a.lmcdn.ru/img389x562/R/T/RTLACZ451202_22685691_1_v1.jpg"]},
    {id: 5, brand: "nike", price: 200120, type: "Кеды", desc: "кеды фирмы хасбик", rating: 2, img:["https://a.lmcdn.ru/img389x562/M/P/MP002XW01ENA_23105387_1_v1_2x.jpg"]},
    {id: 6, brand: "nike", price: 20003, type: "Кеды", desc: "кеды фирмы хасбик", rating: 2, img:["https://a.lmcdn.ru/img389x562/R/T/RTLADC097201_21676660_1_v1_2x.jpg",
        "https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg","https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg",
        "https://a.lmcdn.ru/img600x866/R/T/RTLADF310501_22229212_4_v1_2x.jpg"
  ]}];

  const GridContent = styled("div")(({ theme }) => ({
    position: "relative",
    marginTop: 30

}));

const OneItemGrid = () => {

    let { itemId } = useParams();
    const card = cards.filter(item => item.id === parseInt(itemId as string))

    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');

    const handleRatingChange = (e, newValue: number) => {
        setRating(newValue);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        console.log('Rating:', parseFloat(rating));
        console.log('Comment:', comment);
        console.log('Id:', card[0].id);

    };

    const isFormEmpty = () => {
        return !rating || comment.trim().length <= 30;
        };

    return (
        <Container fixed sx={{marginTop: 8}}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <ImageList
                                sx={{ width: 500, height: 'auto', overflow: 'hidden'}}
                                variant="quilted"
                                cols={4}
                                rowHeight={155}  
                                >
                                {card.map((item) => (
                                    item.img.map((imgSrc, index) => (
                                        <ImageListItem
                                            key={index}
                                            cols={index === 0 ? 3 : 1}
                                            rows={index === 0 ? 3 : 1}
                                        >
                                            <img
                                                {...srcset(imgSrc, 121)}
                                                alt={`${item.brand} ${item.type}`}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))
                                ))}
                                </ImageList>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <GridContent >
                                {card.map((item) => (
                                    <div key={item.id} >
                                        <Typography 
                                        component="h1"
                                        variant="h3"
                                        color="inherit"
                                        gutterBottom
                                        >
                                            {`${item.type} ${item.brand}`}
                                        </Typography>
                                        <Typography
                                        
                                        variant="h5"
                                        color="inherit"
                                        paragraph
                                        >
                                            {`Цена: ${item.price} рублей`}
                                        </Typography>
                                        <Rating name="read-only" precision={0.5} value={item.rating} readOnly />
                                        <GridContent>
                                            <IconButton 
                                            size="large"
                                            aria-label="cart "
                                            aria-haspopup="true"
                                            color="inherit"
                                            sx={{mr: 1}}
                                            >
                                                <FavoriteIcon/>
                                            </IconButton>
                                            <IconButton 
                                            size="large"
                                            aria-label="cart "
                                            aria-haspopup="true"
                                            color="inherit"
                                            sx={{mr: 1}}
                                            >
                                                <AddShoppingCartIcon/>
                                            </IconButton>
                                        </GridContent>
                                    </div>
                                ))}
                            </GridContent>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="left" mt={4}>
                        {card.map((item) => (
                            <div key={item.id}>
                                <Typography
                                component="h1"
                                variant="h4"
                                color="inherit"
                                gutterBottom
                                >
                                    Описание
                                </Typography>
                                <Typography
                                variant="h5"
                                color="inherit"
                                paragraph
                                >{
                                    `${item.desc}`}
                                </Typography>
                                <Box sx={{width: 350}}>
                                    <Typography 
                                    variant="h6"  
                                    color="inherit" 
                                    gutterBottom
                                    >
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
                                        <Button type="submit" variant="contained" color="primary" disabled={isFormEmpty()}>
                                            Отправить отзыв
                                        </Button>
                                        </Box>
                                    </form>
                                </Box>
                            </div>
                        ))}
                    </Grid>
            </Container>
    );
};

export default OneItemGrid;