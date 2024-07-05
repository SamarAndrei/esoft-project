import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OneItemPage from './pages/OneItemPage';
import NoMatchPage from './pages/NoMatchPage';
import CartPage from './pages/CartPage';
import FavouritesPage from './pages/FavouritesPage';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import OneOrderPage from './pages/OneOrderPage';

const routes = [
    { path: '', element: <HomePage /> },
    { path: 'item/:itemId', element: <OneItemPage /> },
    { path: '*', element: <NoMatchPage /> },
    { path: 'cart', element: <CartPage /> },
    { path: 'favourite', element: <FavouritesPage /> },
    { path: 'orders', element: <OrdersPage /> },
    { path: 'orders/:orderId', element: <OneOrderPage /> },
];

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
);
