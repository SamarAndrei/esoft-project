import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OneItemGrid from '../components/OneItemGrid';
import withDataFetching from '../components/Preloader';

const OneItem = () => {

    return (
        <main>
            <Header/>
            <EnhancedOneItemGrid/>
            <Footer/>
        </main>
    );
};

const EnhancedOneItemGrid = withDataFetching()(OneItemGrid);
export default OneItem;