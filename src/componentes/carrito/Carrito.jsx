import { useCart } from '../../context/CarritoContext.jsx';
 // 1. Importamos el hook

const Carrito = () => {
// 2. Obtenemos el estado 'carrito' y las funciones que necesitemos del contexto
const { carrito, clearCart, getCartTotal } = useCart();
// Si el carrito está vacío, mostramos un mensaje
if (carrito.length === 0) {
    return (
        <div>
            <h1>El carrito está vacío</h1>
            <p>Agrega productos para continuar la compra.</p>
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
            </div>
        ))}
        <hr />
        <h3>Total a pagar: ${getCartTotal()}</h3>
        <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
    );
};

export default Carrito;
