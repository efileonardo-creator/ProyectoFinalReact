import {Link} from "react-router-dom";
import { useCart } from "../hooks/CarritoHook.jsx"; 
import { useAuth } from "../hooks/AuthHooks.jsx"; //Importamos el hook personalizado para acceder al contexto de autenticación

function Header() {
    const { user, logout } = useAuth(); // 2. Usamos el hook para acceder a la función
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <header className="header bg-gray-800 text-white p-4 w-full text-center">
            <h1>Bienvenidos a Mi tienda online</h1>
            <ul className="flex justify-center space-x-4 mt-4">
                <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 &&
                <span>{totalItems}</span>}</Link></li>
            </ul>
            <ul>{/* Lógica de renderizado condicional */}
                {user ? (
                <>{/* Mostrar Gestion SOLO si el usuario es admin */}
                {user.rol === 'admin' && (
                <li><Link to="/alta" style={{ color: 'black'}}>Gestion</Link></li>)}
                <span>¡Hola, {user.email}!</span>
                <button onClick={logout}>Cerrar Sesión</button>
                </>
                ) : (
                    <ul>
                        <li><Link to="/login">Login</Link></li> 
                        <li><Link to="/registro">Registro</Link></li>
                    </ul>
                )}

            </ul>
        </header>
    );
}
export default Header;