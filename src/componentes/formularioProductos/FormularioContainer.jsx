import {useState} from 'react';
import {FormularioProductos} from './FormularioProductos.jsx';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: ''

    }
    );
    const manejarCambio = (e) => {
        const {name, value} = e.target;
        setDatosForm({ ...datosForm, [name]: value });
    };
    const manejarEnvio = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', datosForm);
        // Aca se puede procesar los datos según las necesidades.
    }

    return (
        <FormularioProductos 
            datosForm={datosForm} 
            manejarCambio={manejarCambio} 
            manejarEnvio={manejarEnvio} 
        />
    );

}