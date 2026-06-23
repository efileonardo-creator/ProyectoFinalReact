// En /componentes/Item/Item.jsx
import { useState } from 'react';
import MarcarComoFavorito from '../marcarComoFavorito/MarcarComoFavorito.jsx';

export default function Item({ id, nombre, precio, stock }) {
    const [cantidad, setCantidad] = useState(0);
    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };
    const agregarAlCarrito = () => {
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }
    return (
        <div className='flex flex-col items-center border p-4 m-2'>
            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:
                    'center', margin: '10px 0' }}>
                    <button onClick={decrementar}>-</button>
                    <p style={{ margin: '0 10px' }}>{cantidad}</p>
                    <button onClick={incrementar}>+</button>
                </div>
            <button onClick={agregarAlCarrito}>Agregar al Carrito</button>
            <MarcarComoFavorito />
        </div>
    );
}