import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import OneItemPage from './pages/OneItemPage';
// // import NoMatchPage from './pages/NoMatchPage';
// import CartPage from './pages/CartPage';
// import FavouritesPage from './pages/FavouritesPage';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
// import OrdersPage from './pages/OrdersPage';
// import OneOrderPage from './pages/OneOrderPage';
import React, { Suspense } from 'react';
import Spinner from './components/Spinner';

const LazyNoMatchPage = React.lazy(() => import('./pages/NoMatchPage'));
const LazyCartPage = React.lazy(() => import('./pages/CartPage'));
const LazyFavouritesPage = React.lazy(() => import('./pages/FavouritesPage'));
const LazyOneItemPage = React.lazy(() => import('./pages/OneItemPage'));
const LazyOrdersPage = React.lazy(() => import('./pages/OrdersPage'));
const LazyOneOrderPage = React.lazy(() => import('./pages/OneOrderPage'));

const routes = [
    { path: '', element: <HomePage /> },
    { path: 'item/:itemId', element: <LazyOneItemPage /> },
    { path: '*', element: <LazyNoMatchPage /> },
    { path: 'cart', element: <LazyCartPage /> },
    { path: 'favourite', element: <LazyFavouritesPage /> },
    { path: 'orders', element: <LazyOrdersPage /> },
    { path: 'orders/:orderId', element: <LazyOneOrderPage /> },
];

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Suspense fallback={<Spinner />}>
                                {route.element}
                            </Suspense>
                        }
                    />
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
);
