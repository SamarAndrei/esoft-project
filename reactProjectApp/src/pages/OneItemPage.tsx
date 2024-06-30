import Header from '../components/Header';
import Footer from '../components/Footer';
import OneItemGrid from '../components/OneItemGrid';
import withDataFetching from '../components/Preloader';
import { useParams } from 'react-router-dom';

const OneItem = () => {
    const { itemId } = useParams();

    const EnhancedOneItemGrid = withDataFetching(
        `http://localhost:3000/api/production/${itemId}`,
    )(OneItemGrid);

    return (
        <main>
            <Header />
            <EnhancedOneItemGrid />
            <Footer />
        </main>
    );
};

export default OneItem;
