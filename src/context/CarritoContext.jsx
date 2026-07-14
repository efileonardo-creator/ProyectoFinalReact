import { useState } from 'react';
import { CartContext } from '../componentes/hooks/CarritoHook';
import Mensaje from '../componentes/mensaje/Mensaje.jsx';

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [modalInfo, setModalInfo] = useState({
        abierto: false,
        mensaje: '',
        titulo: 'Aviso',
        onConfirm: null,
        onCancel: null
    });

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

    const cerrarMensaje = () => {
        setModalInfo((prev) => ({ ...prev, abierto: false }));
    };

    const removeItem = (productId) => {
        setModalInfo({
            abierto: true,
            titulo: 'Confirmar eliminación',
            mensaje: '¿Desea eliminar este producto del carrito?',
            onConfirm: () => {
                setCarrito((prevCart) => prevCart.filter((item) => item.id !== productId));
                cerrarMensaje();
            },
            onCancel: () => cerrarMensaje()
        });
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
            <Mensaje
                abierto={modalInfo.abierto}
                mensaje={modalInfo.mensaje}
                titulo={modalInfo.titulo}
                onConfirm={modalInfo.onConfirm}
                onCancel={modalInfo.onCancel}
            />
        </CartContext.Provider>
    );
};

