import ItemList from './ItemList.jsx';

export default function ItemListContainer() {
    const productos = [
        { id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15 },
        { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25 },
        { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50 },];
    return (
        <div>
            <h2 className='flex justify-center'>Lista de Productos</h2>
            <ItemList productos={productos} />
        </div>
    );
}