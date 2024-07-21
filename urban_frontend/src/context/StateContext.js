"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    // Load initial state from local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
                const savedTotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
                const savedTotalQuantity = JSON.parse(localStorage.getItem('totalQuantity'));

                if (savedCartItems) setCartItems(savedCartItems);
                if (savedTotalPrice) setTotalPrice(savedTotalPrice);
                if (savedTotalQuantity) setTotalQuantity(savedTotalQuantity);

            } catch (error) {
                console.error("Failed to load from localStorage", error);
            }
        }
    }, []);

    // Save state to local storage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
                localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
            } catch (error) {
                console.error("Failed to save to localStorage", error);
            }
        }
    }, [cartItems, totalPrice, totalQuantity]);

    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) {
                return 1
            }
            return prevQty - 1;
        });
    };

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.some((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
                }
                return cartProduct;
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const onRemove = (id) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
        setCartItems(newCartItems);
        toast.success(`${foundProduct.name} removed from the cart.`);
    };

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'increase') {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
        } else if (value === 'decrease') {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
            }
        }
    };
    return (
        <Context.Provider
            value={
                {
                    showCart,
                    setShowCart,
                    cartItems,
                    totalPrice,
                    totalQuantity,
                    qty,
                    increaseQty,
                    decreaseQty,
                    onAdd,
                    onRemove,
                    toggleCartItemQuantity, setTotalQuantity, setTotalPrice, setQty, setCartItems
                }
            }
        >
            {children}
        </Context.Provider>
    )
};


export const useStateContext = () => useContext(Context);