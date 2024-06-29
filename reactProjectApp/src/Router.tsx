import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import OneItem from './pages/OneItem';
import NoMatchPage from './pages/NoMatchPage';
import CartPage from './pages/CartPage';
import FavouriteListPage from './pages/FavouriteListPage';

const routes = [
    { path: '/', element: <App /> },
    { path: '/item/:itemId', element: <OneItem /> },
    { path: '*', element: <NoMatchPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/favourite', element: <FavouriteListPage /> },
];

export const Router = () => (
    <BrowserRouter>
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    </BrowserRouter>
);
