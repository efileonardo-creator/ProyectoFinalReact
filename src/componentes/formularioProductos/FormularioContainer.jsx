import {useState} from 'react';
import {FormularioProductos} from './FormularioProductos.jsx';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: ''

    }
    );
    const manejarCambio = (event) => {
        const {name, value} = event.target;
        console.log(`Campo: ${name}, Valor: ${value}`);
        setDatosForm({ ...datosForm, [name]: value });
    };
    const manejarEnvio = (e) => {
        e.preventDefault();
        console.log('Enviando datos a la API', datosForm);
        // Aca se puede procesar los datos según las necesidades.
    };

    return (
        <FormularioProductos 
            datosForm={datosForm} 
            manejarCambio={manejarCambio} 
            manejarEnvio={manejarEnvio} 
        />
    );

}