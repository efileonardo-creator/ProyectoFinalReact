import {useState} from "react";
export default function MarcarComoFavorito() {
    const [esFavorito, setEsFavorito] = useState(false);

    const handleClick = () => {
        setEsFavorito(!esFavorito);
        esFavorito();
    };

    return (
    <span onClick={handleClick}
        style={{ fontSize: '24px'}}
        > {esFavorito ? '⭐' : '☆'}
    </span>   );
}