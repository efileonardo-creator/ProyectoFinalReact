
export function FormularioProductos({datosForm, manejarCambio, manejarEnvio, manejarCambioImagen}) {
const formStyle = {
display: 'flex',
flexDirection: 'column',
maxWidth: '24rem',
margin: '3rem auto',
padding: '1.5rem',
border: '1px solid #ddd',
borderRadius: '8px',
gap: '16px'
};
return (
    <form style={formStyle} onSubmit={manejarEnvio}>
        <h3>Agregar Nuevo Producto</h3>
        <div>
            <label>Nombre del Producto:</label>
            <input 
            type="text" 
            name="nombre"
            placeholder=" Ej: Teclado Mecánico" 
            value={datosForm.nombre} 
            onChange={manejarCambio} />
        </div>
        <div>
            <label>Precio:</label>
            <input 
            type="number" 
            name="precio"
            placeholder=" Ej: 95" 
            value={datosForm.precio} 
            onChange={manejarCambio} />
        </div>
        <div>
            <label>Stock:</label>
            <input 
            type="number" 
            name="stock"
            placeholder=" Ej: 5" 
            value={datosForm.stock} 
            onChange={manejarCambio} />
        </div>
        <div>
            <label>Imagen:</label>
            <input 
            type="file" 
            name="Imagen"
            placeholder="https://api.imgbb.com/1/upload"
            value={datosForm.urlImagen} 
            onChange={manejarCambioImagen}
            />
        </div>
        <button type="submit" className="bc p-2">Guardar Producto</button>
    </form>
    );
}