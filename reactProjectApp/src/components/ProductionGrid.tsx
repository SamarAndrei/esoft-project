import { Container, Grid, Typography } from '@mui/material';
import MainCard from './MainCard';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { CardType } from './TCard.js';

const ProductionGrid: React.FC<{ data: CardType[] }> = ({ data }) => {
    const [searchParams] = useSearchParams();
    const qQuery = searchParams.getAll('q')[0] || '';
    const genderQuery = searchParams.getAll('gender')[0] || '';
    const typeQuery = searchParams.getAll('type')[0] || '';

    return (
        <Container id="cards" sx={{ marginTop: 8 }}>
            {data.length != 0 ? (
                <>
                    <Grid container spacing={4}>
                        {data.map((card, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <MainCard card={card} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center" mt={4}></Grid>
                </>
            ) : (
                <Grid container justifyContent="center">
                    <Typography variant="h4">
                        Ничего не найдено или ассортимент кончился увы... По
                        запросу: {`"${genderQuery},${typeQuery} ${qQuery}"`}
                    </Typography>
                </Grid>
            )}
        </Container>
    );
};

export default ProductionGrid;
