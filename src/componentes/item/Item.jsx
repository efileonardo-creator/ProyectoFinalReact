import { useState } from 'react';
import { Link } from 'react-router-dom';
import MarcarComoFavorito from '../marcarComoFavorito/MarcarComoFavorito.jsx';
import { useCart } from '../hooks/CarritoHook.jsx';

export default function Item({ id, nombre, precio, stock, imagen }) {
    const producto = { id, nombre, precio, stock, imagen };
    const [cantidad, setCantidad] = useState(1);
    const { agregarAlCarrito, getCantidadActual } = useCart();
    const cantidadActual = getCantidadActual(producto.id);

    const incrementar = () => {
        setCantidad((prev) => (prev < stock ? prev + 1 : prev));
    };

    const decrementar = () => {
        setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const agregarItemAlCarrito = () => {
        const agregado = agregarAlCarrito(producto, cantidad);
        if (agregado) {
            setCantidad(1);
        }
    };

    return (
        <div className="soft-card m-2 flex flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <Link to={`/ProductosNacionales/${id}`} className="overflow-hidden rounded-xl">
                <img src={imagen} alt={nombre} className="h-36 w-full object-cover transition hover:scale-105" />
            </Link>

            <div className="mt-4 flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-slate-800">{nombre}</h3>
                <p className="mt-2 text-sm text-slate-500">Stock disponible: {stock}</p>
                <p className="mt-1 text-xl font-bold text-blue-600">${precio}</p>

                <div className="mt-4 flex items-center justify-center gap-3 rounded-full border border-slate-200 p-1">
                    <button type="button" onClick={decrementar} className="h-8 w-8 rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100">−</button>
                    <span className="min-w-8 text-center font-semibold text-slate-800">{cantidad}</span>
                    <button type="button" onClick={incrementar} className="h-8 w-8 rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100">+</button>
                </div>

                <button
                    type="button"
                    onClick={agregarItemAlCarrito}
                    className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    {cantidadActual > 0 ? `Agregar ${cantidad} más` : `Agregar ${cantidad} al carrito`}
                </button>

                <div className="mt-3 flex justify-center">
                    <MarcarComoFavorito />
                </div>
            </div>
        </div>
    );
}