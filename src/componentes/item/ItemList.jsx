import Item from './Item.jsx';

export default function ItemList({productos}) {
    return (
        <div>
            {productos.map(prod => (
            <Item key={prod.id} {...prod} />            ))}
        </div>
    );
}