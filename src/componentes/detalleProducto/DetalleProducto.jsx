import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function DetalleProducto() {

    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch("/data/productos.json")
        .then(response => response.json())
        .then(data => {
            const productoEncontrado = data.find(p => p.id === parseInt(id));
            setProducto(productoEncontrado);
        })
        .catch(error => console.error("Error al cargar los datos del producto:", error));
    }, [id]);

    if (!producto) {
        return <p>Cargando detalles del producto...</p>;
    }

    if (!producto.id) {
        return <p>Producto no encontrado.</p>;
    }
    // Con este 'id', podríamos hacer una llamada a una API para buscar los datos del producto
return (
    <div className="flex flex-col items-center p-4">
        <h2>Detalle del Producto</h2>
        <p>Mostrando información para el producto: {id}</p>
        <strong>{producto.nombre}</strong>
        <img src={producto.imagen} alt={producto.nombre} style={{ maxWidth:'400px' }} />
        <h3>${producto.precio}</h3>
        <p>{producto.descripcion}</p>
    </div>
    )
}
