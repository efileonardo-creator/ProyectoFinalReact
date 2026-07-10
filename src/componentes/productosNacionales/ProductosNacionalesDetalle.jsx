import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config.js';

const ProductosNacionalesDetalle = () => {
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const cargarProducto = async () => {
            if (!id) {
                setCargando(false);
                return;
            }

            setCargando(true);
            try {
                const docRef = doc(db, 'productos', id);
                const resp = await getDoc(docRef);

                if (resp.exists()) {
                    setProducto({ ...resp.data(), id: resp.id });
                } else {
                    setProducto(null);
                }
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                setProducto(null);
            } finally {
                setCargando(false);
            }
        };

        cargarProducto();
    }, [id]);

    const spinnerSrc = `data:image/svg+xml;utf8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#2563eb" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="251.2" stroke-dashoffset="62.8" />
        </svg>
    `)}`;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
                {cargando ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <img src={spinnerSrc} alt="Cargando producto" className="h-16 w-16" style={{ animation: 'spin 1s linear infinite' }} />
                        <p className="mt-3 text-slate-600">Cargando producto...</p>
                    </div>
                ) : producto ? (
                    <div className="grid gap-8 md:grid-cols-2">
                        <img src={producto.imagen} alt={producto.nombre} className="h-80 w-full rounded-2xl object-cover" />
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">{producto.nombre}</h1>
                            <p className="mt-3 text-slate-600">{producto.descripcion}</p>
                            <div className="mt-6 space-y-2 text-slate-700">
                                <p><span className="font-semibold">Categoría:</span> {producto.categoria}</p>
                                <p><span className="font-semibold">Precio:</span> ${producto.precio}</p>
                                <p><span className="font-semibold">Stock:</span> {producto.stock} unidades</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-xl font-semibold text-slate-700">Producto no encontrado</h2>
                )}
            </div>
        </div>
    );
};

export default ProductosNacionalesDetalle;
