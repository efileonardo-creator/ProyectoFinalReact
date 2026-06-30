//import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
//     const [opened, setOpened] = useState(false);
    return (
 <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                {/* Menú escritorio */}
                <ul className="hidden md:flex gap-6">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/Productos">Productos</Link></li>
                    <li><Link to="/Contacto">Contacto</Link></li>
                    <li><Link to="/Carrito">Carrito</Link></li>
                
                </ul>

                {/* Botón hamburguesa */}
                <button
                    className="md:hidden backdrop:blur-sm bg-white/30 p-2 rounded"
//                    onClick={() => setOpened(!opened)}
                >
                        <ul className="flex flex-col gap-2 absolute top-16 right-4 bg-blue-600 p-4 rounded">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/Productos">Productos</Link></li>
                            <li><Link to="/Carrito">Carrito</Link></li>
                            <li><Link to="/AltaProducto">Alta de producto</Link></li>
                            <li><Link to="/Contacto">Contacto</Link></li>
                        </ul>
                </button>
            </div>
        </nav>
    );
};
export default Navbar;