import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/Fallback';
import PaperMainPage from '../components/PaperMainPage';
import withDataFetching from '../components/Preloader';
import ProductionGrid from '../components/ProductionGrid';
import BlockDescription from '../components/BlockDescription';
import { Grid, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchParams] = useSearchParams();

    const qQuery = searchParams.getAll('q')[0] || '';
    const genderQuery = searchParams.getAll('gender')[0] || '';
    const typeQuery = searchParams.getAll('type')[0] || '';

    useEffect(() => {
        setTotalPage(1);
    }, [qQuery, genderQuery, typeQuery]);

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
                <EnhancedProductionGrid
                    page={currentPage}
                    setTotalPage={setTotalPage}
                    qQuery={qQuery}
                    genderQuery={genderQuery}
                    typeQuery={typeQuery}
                />
            </ErrorBoundary>
            <Grid container justifyContent="center">
                <Stack spacing={2}>
                    <Pagination count={totalPage} onChange={handlePageChange} />
                </Stack>
            </Grid>
        </body>
    );
};

const EnhancedProductionGrid = withDataFetching(
    'http://localhost:3000/api/production',
)(ProductionGrid);

export default HomePage;
