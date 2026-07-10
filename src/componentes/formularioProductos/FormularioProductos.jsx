export function FormularioProductos({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, isEditing = false, onCancel }) {
    return (
        <form className="flex flex-col gap-4" onSubmit={manejarEnvio}>
            <h3 className="text-xl font-semibold text-slate-800">{isEditing ? 'Editar producto' : 'Agregar nuevo producto'}</h3>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Nombre del producto</label>
                    <input type="text" name="nombre" placeholder="Ej: Teclado Mecánico" value={datosForm.nombre} onChange={manejarCambio} className="rounded-lg border border-slate-300 px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Categoría</label>
                    <input type="text" name="categoria" placeholder="Ej: Tecnología" value={datosForm.categoria} onChange={manejarCambio} className="rounded-lg border border-slate-300 px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Precio</label>
                    <input type="number" name="precio" placeholder="Ej: 95" value={datosForm.precio} onChange={manejarCambio} className="rounded-lg border border-slate-300 px-3 py-2" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-slate-700">Stock</label>
                    <input type="number" name="stock" placeholder="Ej: 5" value={datosForm.stock} onChange={manejarCambio} className="rounded-lg border border-slate-300 px-3 py-2" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Descripción</label>
                <input type="text" name="descripcion" placeholder="Breve descripción del producto" value={datosForm.descripcion} onChange={manejarCambio} className="rounded-lg border border-slate-300 px-3 py-2" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Imagen</label>
                <input type="file" name="imagen" onChange={manejarCambioImagen} className="rounded-lg border border-slate-300 px-3 py-2" />
            </div>
            <div className="flex flex-wrap gap-3">
                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    {isEditing ? 'Actualizar producto' : 'Guardar producto'}
                </button>
                {isEditing && (
                    <button type="button" onClick={onCancel} className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}