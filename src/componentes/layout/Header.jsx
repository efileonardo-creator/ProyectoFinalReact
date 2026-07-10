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
            <div className="grid grid-cols-2 align-middle justify-between">
                <div>
                    {/* Lógica de renderizado condicional */}
                        {user ? (
                        <>{/* Mostrar Gestion SOLO si el usuario es admin */}
                        {user.rol === 'admin' && (
                        <Link to="/alta" style={{ color: 'black'}}>Gestion</Link>)}
                        <span>¡Hola, {user.email}!</span>
                        <button className="hover:bg-blue-100 text-amber-600 rounded-xl p-2" onClick={logout}>Cerrar Sesión</button>
                        </>
                        ) : (
                            <>
                                <div className="flex flex-cols gap-5 py-4" >
                                    <div>
                                        <Link to="/login">Login</Link>
                                    </div>
                                    <div>   
                                        <Link to="/registro">Registro</Link>
                                    </div>
                                </div>
                            </>
                        )}
                </div>
                <div className="flex justify-end align-middle">
                    <div className="flex justify-center space-x-4 mt-4 rounded-xl p-1 hover:bg-blue-100 hover:text-blue-950">
                        <Link to="/carrito">Carrito 🛒 {totalItems > 0 &&
                        <span>{totalItems}</span>}</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;