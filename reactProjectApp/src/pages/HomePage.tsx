import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/Fallback';
import PaperMainPage from '../components/PaperMainPage';
import withDataFetching from '../components/Preloader';
import ProductionGrid from '../components/ProductionGrid';
import BlockDescription from '../components/BlockDescription';
import { Grid, Pagination, Stack } from '@mui/material';
import { useState } from 'react';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number,
    ) => {
        setCurrentPage(page);
    };

    return (
        <body>
            <PaperMainPage />
            <BlockDescription />
            <ErrorBoundary FallbackComponent={Fallback}>
                <EnhancedProductionGrid page={currentPage} />
            </ErrorBoundary>
            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination count={10} onChange={handlePageChange} />
                </Stack>
            </Grid>
        </body>
    );
};

const EnhancedProductionGrid = withDataFetching(
    'http://localhost:3000/api/production',
)(ProductionGrid);

export default HomePage;
