import { useEffect, useState, useCallback } from 'react';
import { db } from '../../firebase/config.js';
import { FormularioContainer } from '../formularioProductos/FormularioContainer.jsx';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    const [cargando, setCargando] = useState(true);

    const cargarProductos = useCallback(async () => {
        setCargando(true);
        try {
            const productosRef = collection(db, 'productos');
            const resp = await getDocs(productosRef);
            setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error al cargar productos:', error);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        void cargarProductos();
    }, [cargarProductos]);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm('¿Está seguro de que desea eliminar este producto?');
        if (!confirmacion) return;

        try {
            const docRef = doc(db, 'productos', id);
            await deleteDoc(docRef);
            await cargarProductos();
            alert('Producto eliminado.');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Ocurrió un error al eliminar el producto.');
        }
    };

    const handleProductoGuardado = async () => {
        await cargarProductos();
        setProductoEditando(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8">
            <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
                <h2 className="text-2xl font-bold text-slate-800">Gestión de productos</h2>
                <p className="mt-2 text-slate-600">Creá, editá o eliminá productos desde esta vista.</p>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-2xl border border-slate-200 p-5">
                        <FormularioContainer
                            productoEditando={productoEditando}
                            onProductoGuardado={handleProductoGuardado}
                            onCancelEdit={() => setProductoEditando(null)}
                        />
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-5">
                        <h3 className="text-lg font-semibold text-slate-800">Productos cargados</h3>
                        {cargando ? (
                            <p className="mt-4 text-slate-600">Cargando productos...</p>
                        ) : (
                            <div className="mt-4 space-y-3">
                                {productos.map((prod) => (
                                    <div key={prod.id} className="rounded-xl border border-slate-200 p-3">
                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                <p className="font-semibold text-slate-800">{prod.nombre}</p>
                                                <p className="text-sm text-slate-500">${prod.precio} · Stock: {prod.stock}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setProductoEditando(prod)} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                                    Editar
                                                </button>
                                                <button type="button" onClick={() => handleDelete(prod.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700">
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gestion;