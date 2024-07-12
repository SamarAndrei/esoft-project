import { useParams } from 'react-router-dom';
import withDataFetching from '../components/Preloader';
import OrderItems from '../components/OrderItems';

const OneOrderPage = () => {
    const { orderId } = useParams();

    const EnhancedOrdersItems = withDataFetching(
        `https://esoft-project-app-api.onrender.com/api/orders/${orderId}`,
    )(OrderItems);

    return <EnhancedOrdersItems />;
};

export default OneOrderPage;
