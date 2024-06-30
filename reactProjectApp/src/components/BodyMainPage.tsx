import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './Fallback';
import PaperMainPage from './PaperMainPage';
import withDataFetching from './Preloader';
import ProductionGrid from './ProductionGrid';
import BlockDescription from './BlockDescription';

const Body = () => {
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

export default Body;
