import {Link} from "react-router-dom";
import { useCart } from "../hooks/CarritoHook.jsx"; 


function Header() {
// 2. Usamos el hook para acceder a la función
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <header className="header bg-gray-800 text-white p-4 w-full text-center">
            <h1>Bienvenidos a Mi tienda online</h1>
            <ul className="flex justify-center space-x-4 mt-4">
                <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 &&
                <span>{totalItems}</span>}</Link></li>
            </ul>
        </header>
    );
}
export default Header;