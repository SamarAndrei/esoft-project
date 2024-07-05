import { Container, Grid, Typography } from '@mui/material';
import MainCard from './MainCard';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { CardType } from './TCard.js';

const ProductionGrid: React.FC<{ data: CardType[] }> = ({ data }) => {
    const [searchParams] = useSearchParams();
    const qQuery = searchParams.getAll('q')[0] || '';
    const [items, setData] = useState(data);

    useEffect(() => {
        if (qQuery !== '') {
            const lowerCaseQuery = qQuery.toLowerCase();
            setData(
                data.filter(
                    item =>
                        item.brand.toLowerCase().includes(lowerCaseQuery) ||
                        item.description.toLowerCase().includes(lowerCaseQuery),
                ),
            );
        } else {
            setData(data);
        }
    }, [qQuery, data, items]);

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
                    <Grid container justifyContent="center" mt={4}></Grid>
                </>
            ) : (
                <Grid container justifyContent="center">
                    <Typography variant="h4">
                        Ничего не найдено по запросу или ассортимент кончился увы...: {`<${qQuery}>`}
                    </Typography>
                </Grid>
            )}
        </Container>
    );
};

export default ProductionGrid;
