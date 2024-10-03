import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [search, setSearch] = useState();
    const [cartItems, setCartItems] = useState({});
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('select size');
            return;
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
                console.log(token);
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }

                } catch (error) {

                }
            }
        }
        return totalCount
    }
    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }

        return totalAmount;
    }

    const getproductsData = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/product/list');
            if (res.data.success) {
                setProducts(res.data.products); // Assuming setProducts is correctly defined
            } else {
                toast.error(res.data.message); // Display error message if success is false
            }
        } catch (error) {
            console.error('Error fetching product data:', error); // Log any network or other errors
            toast.error('Failed to fetch product data'); // Display a generic error message to the user
        }
    };
    const getUserCart = async (token) => {
        try {
            const res = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (res.data.success) {
                setCartItems(res.data.cartData)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getproductsData();
    }, [])
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setCartItems({})
        navigate('/login');
    }
    const Value = {
        products, currency, delivery_fee, search, setSearch,
        showSearch, setShowSearch, getCartAmount,
        addToCart, cartItems,setCartItems, getCartCount, updateQuantity,
        navigate, backendUrl, token, setToken, logout
    }
    return (
        <ShopContext.Provider value={Value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
