import { useState } from 'react';
import { CartContext } from '../componentes/hooks/CarritoHook';

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto, cantidad = 1) => {
        const stockDisponible = Number(producto?.stock ?? 0);

        if (!Number.isFinite(stockDisponible) || stockDisponible <= 0) {
            return false;
        }

        setCarrito((prevCart) => {
            const itemInCart = prevCart.find((item) => item.id === producto.id);
            const cantidadActual = itemInCart ? itemInCart.cantidad : 0;
            const cantidadPermitida = Math.min(cantidad, Math.max(0, stockDisponible - cantidadActual));

            if (cantidadPermitida <= 0) {
                return prevCart;
            }

            if (itemInCart) {
                return prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: cantidadActual + cantidadPermitida } : item
                );
            }

            return [...prevCart, { ...producto, cantidad: cantidadPermitida }];
        });

        return true;
    };

    const incrementarCantidad = (productId) => {
        setCarrito((prevCart) =>
            prevCart.map((item) => {
                if (item.id !== productId) return item;

                const stockDisponible = Number(item.stock ?? 0);
                if (!Number.isFinite(stockDisponible) || stockDisponible <= item.cantidad) {
                    return item;
                }

                return { ...item, cantidad: item.cantidad + 1 };
            })
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

