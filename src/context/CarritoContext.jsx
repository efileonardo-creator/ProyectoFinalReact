import { useState } from 'react';
import { CartContext } from '../componentes/hooks/CarritoHook';

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        setCarrito((prevCart) => {
            const itemInCart = prevCart.find((item) => item.id === producto.id);
            if (itemInCart) {
                return prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
                );
            }

            return [...prevCart, { ...producto, cantidad }];
        });
    };

    const incrementarCantidad = (productId) => {
        setCarrito((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, cantidad: item.cantidad + 1 } : item
            )
        );
    };

    const disminuirCantidad = (productId) => {
        setCarrito((prevCart) =>
            prevCart.flatMap((item) => {
                if (item.id !== productId) return [item];
                if (item.cantidad <= 1) return [];
                return [{ ...item, cantidad: item.cantidad - 1 }];
            })
        );
    };

    const removeItem = (productId) => {
        setCarrito((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const isInCart = (productId) => {
        return carrito.some((item) => item.id === productId);
    };

    const getCantidadActual = (productId) => {
        const item = carrito.find((item) => item.id === productId);
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
            incrementarCantidad,
            disminuirCantidad,
            clearCart,
            getCartQuantity,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

