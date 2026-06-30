import ItemList from './ItemList.jsx';
import { useState, useEffect } from 'react';

export function ItemListContainer() {

    const [productos, setProductos] = useState([]);
    useEffect(() => {
        fetch('/data/productos.json')
            .then(respuesta => respuesta.json())
            .then(productos => setProductos(productos))
            .catch(error => console.error('¡Ups! Hubo un error:', error));
    }, []);
//    const productos = [
//        { id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15 },
//        { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
//        { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },];
    return (
        <div>
            <h2 className='flex justify-center'>Lista de Productos</h2>
            <ItemList productos={productos} />
        </div>
    );
}