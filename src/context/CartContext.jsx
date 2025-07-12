import React, { createContext, useContext, useState } from 'react';
import chuoi from '../assets/user/images/listItem/chuoi.jpg';
import thitBoNac from '../assets/user/images/listItem/thitbo.jpg';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([
        {
            img: chuoi,
            name: "Chuối",
            price: 5000,
            quantity: 2
        },
        {
            img: thitBoNac,
            name: "Thịt bò nạc",
            price: 10000,
            quantity: 1
        }
    ]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === product.name);

            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                return prevItems.map(item =>
                    item.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới với quantity = 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
    };

    const updateQuantity = (productName, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productName);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.name === productName
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}; 