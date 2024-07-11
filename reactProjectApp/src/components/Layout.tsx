import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import useCheckAuth from '../hooks/useCheckAuth';

const Layout = () => {
    useCheckAuth();
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
