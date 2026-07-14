import { Link } from "react-router-dom"



export function Alerta( mensaje ){
    <div>
        <h2>{mensaje}</h2>
        <button onClick={()=> {<Link to="/productos"></Link>}} className="bg-blue-800 border-amber-700"> Volver al inicio </button>
    </div>
}