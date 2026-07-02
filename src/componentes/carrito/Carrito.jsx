import { useCart } from "../hooks/CarritoHook.jsx";
 // 1. Importamos el hook
import {Link} from "react-router-dom";


const Carrito = () => {
// 2. Obtenemos el estado 'carrito' y las funciones que necesitemos del contexto
const { carrito, clearCart, getCartTotal, removeItem } = useCart();
// Si el carrito está vacío, mostramos un mensaje
if (carrito.length === 0) {
    return (
        <div>
            <h1>El carrito está vacío</h1>
            <p>Agrega productos para continuar la compra.</p>
            <Link to="/productos" className="btn btn-primary">
                Ver Productos
            </Link>
        </div>
);
}
// Si hay productos, los mostramos
return (
    <div>
        <h1>Carrito de Compras</h1>
        {carrito.map(item => (
            <div key={item.id} className="cart-item">
                <h4>{item.nombre}</h4>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio unitario: ${item.precio}</p>
                <p>Subtotal: ${item.precio * item.cantidad}</p>
                <button className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() =>  {removeItem(item.id)} }> Eliminar</button>
            </div>
        ))}
        <hr />
        <h3>Total a pagar: ${getCartTotal()}</h3>
        <button className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={clearCart}>Vaciar Carrito</button>
        <br />
        <Link to="/"  onClick={()=>alert("Gracias por comprar")} className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"> 
            Finalizar Compra
        </Link> 
    </div>
    );
};

export default Carrito;
