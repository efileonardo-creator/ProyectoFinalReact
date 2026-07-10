import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthHooks.jsx';

export function Navbar() {
    const { user } = useAuth();
    const isAdmin = user?.rol === 'admin';
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { to: '/', label: 'Inicio' },
        { to: '/Carrito', label: 'Carrito' },
        ...(isAdmin ? [{ to: '/AltaProducto', label: 'Dashboard' }] : []),
        { to: '/ProductosNacionales', label: 'Productos' },
        { to: '/Contacto', label: 'Contacto' },
    ];

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
                <Link to="/" className="text-xl font-semibold" onClick={closeMenu}>
                    MiTiendita
                </Link>

                <ul className="hidden items-center gap-6 md:flex ">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="transition hover:rounded-full hover:text-black hover:bg-blue-300 px-4 py-3">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="rounded-md border border-white/30 p-2 md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Abrir menú"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {menuOpen && (
                <div className="border-t border-white/20 bg-blue-600 px-4 py-3 md:hidden">
                    <ul className="flex flex-col gap-3">
                        {links.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to} className="block rounded-md px-2 py-1 transition hover:bg-white/10" onClick={closeMenu}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
