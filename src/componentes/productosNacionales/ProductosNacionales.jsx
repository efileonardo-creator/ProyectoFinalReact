import { useState, useEffect } from 'react';
// Importaciones clave de Firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import { Link } from 'react-router-dom';

const ProductosNacionales = () => {
    // Estado para guardar los productos que traigamos de la DB
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const productosDB = collection(db,"productos")

        getDocs(productosDB)
            .then((resp) => {
                console.log(resp.docs)
                setProductos(
                    resp.docs.map((doc) => {
                        return{...doc.data(),id: doc.id}
                    })
            )})
            .catch((error) => console.error("Error al traer datos de Firestore:", error));
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez
    
    return (
    
    <div>
        <h1>Productos Nacionales</h1>
        <div className="lista-productos">
            {/* 5. Mapeamos el estado `productos` para renderizar cada
            uno */}
            {productos.map(prod => (
            <div key={prod.id} >
                <img src={prod.imagen} alt={prod.nombre} style={{width: '100px' }} />
                <h3>{prod.nombre}</h3>
                <p>Categoría: {prod.categoria}</p>
                <p>Precio: ${prod.precio}</p>
                <p>Stock: {prod.stock} unidades</p>
                <Link to={`/ProductosNacionales/${prod.id}`}>Ver detalle</Link>
                <hr />
            </div>
            ))}
            </div>
        </div>
    );
};
export default ProductosNacionales;