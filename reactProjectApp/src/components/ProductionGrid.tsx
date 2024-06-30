import { Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import MainCard from './MainCard';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';

type CardType = {
    id: number;
    brand: string;
    size: string[];
    type: string;
    description: string;
    img: string[];
    price: number;
    stock_quantity: number;
    gender: string;
};

const ProductionGrid: React.FC<{ data: CardType[] }> = ({ data }) => {
    const [searchParams] = useSearchParams();
    const qQuery = searchParams.getAll('q')[0] || '';
    const [items, setData] = useState(data);

    useEffect(() => {
        if (qQuery !== '') {
            const lowerCaseQuery = qQuery.toLowerCase();
            setData(
                items.filter(
                    item =>
                        item.brand.toLowerCase().includes(lowerCaseQuery) ||
                        item.description.toLowerCase().includes(lowerCaseQuery),
                ),
            );
        } else {
            setData(data);
        }
    }, [qQuery, data]);

    return (
        <Container id="cards" sx={{ marginTop: 8 }}>
            {items.length != 0 ? (
                <>
                    <Grid container spacing={4}>
                        {items.map((card, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <MainCard card={card} />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center" mt={4}>
                        <Stack spacing={2}>
                            <Pagination count={10} />
                        </Stack>
                    </Grid>
                </>
            ) : (
                <Grid container justifyContent="center">
                    <Typography variant="h4">
                        Ничего не найдено по запросу: {`<${qQuery}>`}
                    </Typography>
                </Grid>
            )}
        </Container>
    );
};

export default ProductionGrid;
