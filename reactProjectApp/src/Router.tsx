import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from "./App";
import OneItem from "./pages/OneItem";
import NoMatchPage from "./pages/NoMatchPage";
import CartPage from "./pages/CartPage";
import FavouriteListPage from "./pages/FavouriteListPage";

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path="/item/:itemId" element={<OneItem/>}/>
            <Route path='*' element={<NoMatchPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/favourite" element={<FavouriteListPage/>}/>

        </Routes>
    </BrowserRouter>
);