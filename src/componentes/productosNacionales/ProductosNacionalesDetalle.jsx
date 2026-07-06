import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Importaciones clave para obtener un solo documento
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/config';

const ProductosNacionalesDetalle = () => {
const [prod, setItem] = useState(null);
const { id } = useParams(); //Tomamos el parámetro id
    useEffect(() => {
        if (id) {
            // Creamos la referencia al documento
    const docRef = doc(db, "productos", id);
    getDoc(docRef)
        .then((resp) => {
            if (resp.exists()) { // Verificamos si el documento existe
                setItem({ ...resp.data(), id: resp.id });
            } else {
                console.log("No se encontró el producto");
                return(
                    <h2>Producto no encontrado</h2>)
            }
        })
        .catch(error => console.log(error));
    }
}, [id]);

return (
    <div>
        {prod ? (
            <div>
                <h1>{prod.nombre}</h1>
                <img src={prod.imagen} alt={prod.nombre} style={{width: '200px' }} />
                <p>Categoría: {prod.categoria}</p>
                <p>Precio: ${prod.precio}</p>
                <p>Stock: {prod.stock} unidades</p>
                <p>Descripción: {prod.descripcion}</p>
            </div>
        ) : (
            <p>Cargando producto...</p>
        )}
    </div>
    );
};
export default ProductosNacionalesDetalle;
