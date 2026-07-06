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
// NUEVA FUNCIÓN: Eliminar un producto del carrito

const removeItem = (productId) => {
const updatedCart = carrito.filter(item => item.id !== productId);
setCarrito(updatedCart);
};
// NUEVA FUNCIÓN: Verificar si un producto ya está en el carrito
const isInCart = (productId) => {
return carrito.some(item => item.id === productId);
};


//Obtener la cantidad de un item específico
const getCantidadActual = (productId) => {
    const item = carrito.find(item => item.id === productId);
    return item ? item.cantidad : 0;
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
    <CartContext.Provider value={{ 
        carrito, 
        removeItem, 
        isInCart, 
        getCantidadActual, 
        agregarAlCarrito, 
        clearCart, 
        getCartQuantity, 
        getCartTotal }}>
        {children}
    </CartContext.Provider>
    );
};

