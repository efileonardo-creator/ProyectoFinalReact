import { useState } from 'react';
import {CartContext} from '../componentes/hooks/CarritoHook';

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto, cantidad) => {
    const itemInCart = carrito.find(item => item.id === producto.id);
    if (itemInCart) {
        const updatedCart = carrito.map(item =>
            item.id === producto.id
                ? { ...item, cantidad: item.cantidad + cantidad }
                : item
        );
        setCarrito(updatedCart);
    } else {
        setCarrito(prevCart => [...prevCart, { ...producto, cantidad: cantidad }]);
    }
};

const clearCart = () => {
    setCarrito([]);
};

const getCartQuantity = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
};

const getCartTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
};

return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, clearCart, getCartQuantity, getCartTotal }}>
        {children}
    </CartContext.Provider>
    );
};

