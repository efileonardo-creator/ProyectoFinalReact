
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
            <label>Descripción:</label>
            <input 
            type="text" 
            name="descripcion"
            placeholder=" Breve descripción del producto" 
            value={datosForm.descripcion} 
            onChange={manejarCambio} />
        </div>
        <div>
            <label>Categoría:</label>
            <input 
            type="text" 
            name="categoria"
            placeholder=" Ej: Tecnología" 
            value={datosForm.categoria} 
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
            name="imagen"
            placeholder="https://api.imgbb.com/1/upload"
            value={datosForm.imagen} 
            onChange={manejarCambioImagen}
            />
        </div>
        <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Guardar Producto</button>
    </form>
    );
}