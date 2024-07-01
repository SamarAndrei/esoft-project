import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/Fallback';
import PaperMainPage from '../components/PaperMainPage';
import withDataFetching from '../components/Preloader';
import ProductionGrid from '../components/ProductionGrid';
import BlockDescription from '../components/BlockDescription';

const HomePage = () => {
    return (
        <body>
            <PaperMainPage />
            <BlockDescription />
            <ErrorBoundary FallbackComponent={Fallback}>
                <EnhancedProductionGrid />
            </ErrorBoundary>
        </body>
    );
};

const EnhancedProductionGrid = withDataFetching(
    'http://localhost:3000/api/production',
)(ProductionGrid);

export default HomePage;
