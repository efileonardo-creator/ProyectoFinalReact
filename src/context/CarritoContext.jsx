import { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const agregarAlCarrito = (producto, cantidad) => {
    const itemInCart = cart.find(item => item.id === producto.id);
    if (itemInCart) {
        const updatedCart = cart.map(item =>
            item.id === producto.id
                ? { ...item, quantity: item.quantity + cantidad }
                : item
        );
        setCart(updatedCart);
    } else {
        setCart(prevCart => [...prevCart, { ...producto, cantidad: cantidad }]);
    }
};

const clearCart = () => {
    setCart([]);
};

const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
};

const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
};

return (
    <CartContext.Provider value={{ cart, agregarAlCarrito, clearCart, getCartQuantity, getCartTotal }}>
        {children}
    </CartContext.Provider>
    );
};

