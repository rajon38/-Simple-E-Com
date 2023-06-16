import React from 'react';
import Navbar from "./Components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import Register from "./pages/Auth/Register";
import LogIn from "./pages/Auth/LogIn";
import Footer from "./Components/footer";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Dashboard from "./pages/User/Dashboard";
import UserOrders from "./pages/User/UserOrders";
import UserProfile from "./pages/User/UserProfile";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:slug" element={<CategoryView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:slug" element={<ProductView />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="user" element={<Dashboard />} />
                    <Route path="user/profile" element={<UserProfile />} />
                    <Route path="user/orders" element={<UserOrders />} />
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;