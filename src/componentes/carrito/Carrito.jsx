import { Link } from 'react-router-dom';
import { useCart } from '../hooks/CarritoHook.jsx';

const Carrito = () => {
    const { carrito, clearCart, getCartTotal, removeItem, incrementarCantidad, disminuirCantidad } = useCart();

    if (carrito.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800">El carrito está vacío</h1>
                    <p className="mt-2 text-slate-600">Agregá productos para continuar la compra.</p>
                    <Link to="/ProductosNacionales" className="mt-6 inline-block rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        Ver productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-sm md:p-8">
                <h1 className="text-2xl font-bold text-slate-800">Carrito de compras</h1>

                <div className="mt-6 space-y-4">
                    {carrito.map((item) => (
                        <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h4 className="text-lg font-semibold text-slate-800">{item.nombre}</h4>
                                <p className="text-sm text-slate-500">Precio unitario: ${item.precio}</p>
                                <p className="text-sm text-slate-500">Subtotal: ${item.precio * item.cantidad}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center rounded-full border border-slate-300">
                                    <button type="button" onClick={() => disminuirCantidad(item.id)} className="px-3 py-2 text-lg font-semibold text-slate-700">−</button>
                                    <span className="min-w-8 text-center font-semibold">{item.cantidad}</span>
                                    <button type="button" onClick={() => incrementarCantidad(item.id)} className="px-3 py-2 text-lg font-semibold text-slate-700">+</button>
                                </div>
                                <button type="button" onClick={() => removeItem(item.id)} className="rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-semibold text-slate-800">Total a pagar: ${getCartTotal()}</h3>
                    <div className="flex flex-wrap gap-3">
                        <button type="button" onClick={clearCart} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                            Vaciar carrito
                        </button>
                        <Link to="/" onClick={() => alert('Gracias por comprar')} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                            Finalizar compra
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carrito;
