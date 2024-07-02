import OneItemGrid from '../components/OneItemGrid';
import withDataFetching from '../components/Preloader';
import { useParams } from 'react-router-dom';

const OneItemPage = () => {
    const { itemId } = useParams();

    const EnhancedOneItemGrid = withDataFetching(
        `http://localhost:3000/api/production/${itemId}`,
    )(OneItemGrid);

    return <EnhancedOneItemGrid />;
};

export default OneItemPage;
