import Item from './Item.jsx';

export default function ItemList({productos}) {
    return (
        <div className='flex flex-wrap justify-center'>
            {productos.map(prod => (
            <Item key={prod.id} {...prod} />
            ))}
        </div>
    );
}