import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../store/userSlice';
import { useEffect } from 'react';

const useCheckAuth = () => {
    const store = useSelector((state: unknown) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch, store.isAuth]);

    return store;
};

export default useCheckAuth;
