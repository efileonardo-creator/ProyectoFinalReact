import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config.js';
import { Link } from 'react-router-dom';



const ProductosNacionales = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const PRODUCTOS_POR_PAGINA = 4;

    useEffect(() => {
        const cargarProductos = async () => {
            setCargando(true);
            try {
                const productosRef = collection(db, 'productos');
                const snapshot = await getDocs(productosRef);
                const productosData = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setProductos(productosData);
            } catch (error) {
                console.error('Error al traer datos de Firestore:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarProductos();
    }, []);

    useEffect(() => {
        setPaginaActual(1);
    }, [searchTerm]);

    const productosFiltrados = productos.filter((prod) => {
        const nombre = prod.nombre ?? '';
        return nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA));
    const indiceInicial = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const productosPaginados = productosFiltrados.slice(indiceInicial, indiceInicial + PRODUCTOS_POR_PAGINA);

    useEffect(() => {
        if (paginaActual > totalPaginas) {
            setPaginaActual(1);
        }
    }, [paginaActual, totalPaginas]);

    const spinnerSrc = `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#2563eb" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="251.2" stroke-dashoffset="62.8" />
        </svg>
    `)}`;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">Productos Nacionales</h1>
                    <p className="mt-2 text-slate-600">Descubrí los productos disponibles en nuestra tienda.</p>
                </div>

                <div className="mb-8 flex justify-center">
                    <input
                        type="text"
                        className="w-full max-w-xl rounded-full border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none ring-0 focus:border-blue-500"
                        placeholder="Buscar productos por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {cargando ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <img
                            src={spinnerSrc}
                            alt="Cargando productos"
                            className="h-16 w-16 animate-spin"
                        />
                        <p className="mt-3 text-slate-600">Cargando productos...</p>
                    </div>
                ) : productosFiltrados.length > 0 ? (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                            {productosPaginados.map((prod) => (
                                <div key={prod.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                    <img src={prod.imagen} alt={prod.nombre} className="h-48 w-full object-cover" />
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold text-slate-800">{prod.nombre}</h3>
                                        <p className="mt-2 text-sm text-slate-500">Categoría: {prod.categoria}</p>
                                        <p className="mt-1 text-sm text-slate-500">Stock: {prod.stock} unidades</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xl font-bold text-blue-600">${prod.precio}</span>
                                            <Link to={`/ProductosNacionales/${prod.id}`} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                                Ver detalle
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPaginas > 1 && (
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
                                    className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    Anterior
                                </button>

                                {Array.from({ length: totalPaginas }, (_, index) => {
                                    const pagina = index + 1;
                                    return (
                                        <button
                                            key={pagina}
                                            type="button"
                                            onClick={() => setPaginaActual(pagina)}
                                            className={`rounded-full px-3 py-2 text-sm font-medium ${pagina === paginaActual ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}`}
                                        >
                                            {pagina}
                                        </button>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
                                    className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                        No se encontraron productos con ese nombre.
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProductosNacionales;