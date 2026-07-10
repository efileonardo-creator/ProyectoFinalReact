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
            <div className="flex flex-col align-middle justify-between">
                <div className="">
                    <div className="flex justify-center space-x-4 mt-4">
                        <Link to="/carrito">Carrito 🛒 {totalItems > 0 &&
                        <span>{totalItems}</span>}</Link>
                    </div>
                </div>
                <div>
                    {/* Lógica de renderizado condicional */}
                        {user ? (
                        <>{/* Mostrar Gestion SOLO si el usuario es admin */}
                        {user.rol === 'admin' && (
                        <Link to="/alta" style={{ color: 'black'}}>Gestion</Link>)}
                        <span>¡Hola, {user.email}!</span>
                        <button onClick={logout}>Cerrar Sesión</button>
                        </>
                        ) : (
                            <>
                                <div>
                                    <Link to="/login">Login</Link>
                                </div>
                                <div>   
                                    <Link to="/registro">Registro</Link>
                                </div>
                            </>
                        )}
                </div>
            </div>
        </header>
    );
}
export default Header;