import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/userSlice';
import { useEffect } from 'react';

const Layout = () => {
    const store = useSelector((state: unknown) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch, store.isAuth]);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
