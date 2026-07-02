// En /componentes/Item/Item.jsx
import { useState } from 'react';
import {Link} from 'react-router-dom';
import MarcarComoFavorito from '../marcarComoFavorito/MarcarComoFavorito.jsx';
import { useCart } from '../hooks/CarritoHook.jsx'; // Importamos el hook useCart desde la ruta correcta

export default function Item({ id,nombre, precio, stock, imagen }) {
    const producto = { id, nombre, precio, stock, imagen };
    const [cantidad, setCantidad] = useState(0);
    const { agregarAlCarrito, getCantidadActual } = useCart();
    
// Obtenemos la cantidad YA existente en el carrito desde el contexto
    const cantidadActual = getCantidadActual(producto.id);
    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };
    
    const agregarItemAlCarrito = () => {
        agregarAlCarrito({ id, nombre, precio }, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
    }
    return (
        <div className='flex flex-col items-center border p-4 m-2'>
            <h3>{nombre}</h3>
            <Link to={`/productos/${id}`}><img src={imagen} alt={nombre} className='w-32 h-32 object-cover' /></Link>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent:
                    'center', margin: '10px 0' }}>
                    <button onClick={decrementar}>-</button>
                    <p style={{ margin: '0 10px' }}>{cantidadActual}</p>
                    <button onClick={incrementar}>+</button>
                </div>
            <button onClick={agregarItemAlCarrito}>Agregar {cantidad} al Carrito</button>
            <MarcarComoFavorito />
        </div>
    );
}