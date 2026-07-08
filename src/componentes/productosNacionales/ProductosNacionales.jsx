import { useState, useEffect } from 'react';
// Importaciones clave de Firebase
import { collection, getDocs, query, limit, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import { Link } from 'react-router-dom';



const ProductosNacionales = () => {
    // Estado para guardar los productos que traigamos de la DB
    const [productos, setProductos] = useState([]);
    // Elementos para la paginación y búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [cargando, setCargando] = useState(true);
    const [cargandoMas, setCargandoMas] = useState(false);
    const [ultimoVisible, setUltimoVisible] = useState(null);
    const [hayMas, setHayMas] = useState(true);
    const PRODUCTOS_POR_PAGINA = 2;

    const obtenerProductosIniciales = () => {
        setCargando(true);
        const productosDB = collection(db, "productos");
        const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));
        getDocs(q).then((resp) => {
        const productosData = resp.docs.map((doc) => ({ ...doc.data(), id:doc.id }));

        setProductos(productosData);
        const ultimoDoc = resp.docs[resp.docs.length - 1];
        setUltimoVisible(ultimoDoc);
        setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
        })
        .catch(error => console.error("Error al obtener productos: ", error))
        .finally(() => setCargando(false));
    };
    // Funcion para cargar la siguiente pagina
    const obtenerMasProductos = () => {
        if (!hayMas || cargandoMas) return;
        setCargandoMas(true);
        const productosDB = collection(db, "productos");
        const q = query(productosDB, startAfter(ultimoVisible),
        limit(PRODUCTOS_POR_PAGINA));
        getDocs(q).then((resp) => {
            const productosData = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            setProductos(productosAnteriores => [...productosAnteriores, ...productosData]);

            const ultimoDoc = resp.docs[resp.docs.length - 1];
            setUltimoVisible(ultimoDoc);
            setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
            })
            .catch(error => console.error("Error al cargar mas productos: ", error))
            .finally(() => setCargandoMas(false));
    };

    const verMenos = () => {
        obtenerProductosIniciales();
        // Opcional: Desplazar la vista hacia arriba
        window.scrollTo(0, 0);
    }



        // 2. Filtramos la lista de productos ANTES de renderizarla
    const productosFiltrados = productos.filter(prod =>
        prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            
            <div>
                <input type="text" className="form-control" 
                    placeholder="Buscar productos por nombre..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>  
            <div className="lista-productos">
                {/* 5. Mapeamos el estado `productos` para renderizar cada
                uno */}
                {productosFiltrados.map(prod => (
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
            <div>
                {/* El boton "Ver menos" solo aparece si hay mas de una pagina cargada */}
                {productos.length > PRODUCTOS_POR_PAGINA && (
                <button onClick={verMenos}>
                    Ver menos
                </button>)}
                {/* Boton "Cargar mas" */}
                {hayMas ? (
                <button onClick={obtenerMasProductos} disabled={cargandoMas}>
                    Cargar mas
                </button>
                ) : (
                // No mostramos el alert si solo hay una pagina de resultados
                    productos.length > PRODUCTOS_POR_PAGINA && 
                    <p>No hay mas productos para mostrar.</p>
                )}

            </div>
        </div>
        );
};
export default ProductosNacionales;