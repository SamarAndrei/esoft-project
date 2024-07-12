import OneItemGrid from '../components/OneItemGrid';
import withDataFetching from '../components/Preloader';
import { useParams } from 'react-router-dom';

const OneItemPage = () => {
    const { itemId } = useParams();

    const EnhancedOneItemGrid = withDataFetching(
        `https://esoft-project-app-api.onrender.com/api/production/${itemId}`,
    )(OneItemGrid);

    return <EnhancedOneItemGrid />;
};

export default OneItemPage;
