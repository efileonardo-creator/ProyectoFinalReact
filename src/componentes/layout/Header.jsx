import { Link } from 'react-router-dom';
import { useCart } from '../hooks/CarritoHook.jsx';
import { useAuth } from '../hooks/AuthHooks.jsx';

function Header() {
    const { user, logout } = useAuth();
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <header className="border-b border-slate-200 bg-slate-900 text-white shadow-sm">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-lg">
                        🛍️
                    </div>
                    <div>
                        <p className="text-lg font-semibold">MiTiendita</p>
                        <p className="text-sm text-slate-300">Compras simples y seguras</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {user ? (
                        <>
                            {user.rol === 'admin' && (
                                <Link to="/AltaProducto" className="rounded-full border border-blue-400/40 px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-blue-500/20">
                                    Gestionar
                                </Link>
                            )}
                            <span className="text-sm text-slate-300">Hola, {user.email}</span>
                            <button
                                type="button"
                                className="rounded-full border border-white/20 px-3 py-2 text-sm font-medium transition hover:bg-white/10"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="rounded-full border border-white/20 px-3 py-2 text-sm font-medium transition hover:bg-white/10">
                                Ingresar
                            </Link>
                            <Link to="/registro" className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                                Registrarme
                            </Link>
                        </>
                    )}

                    <Link
                        to="/Carrito"
                        className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        🛒
                        <span>Carrito</span>
                        {totalItems > 0 && <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{totalItems}</span>}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;