import {useState} from 'react';
import {FormularioProductos} from './FormularioProductos.jsx';

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: '',
        urlImagen: ''
    });
    const [imagenFile, setImagenFile] = useState(null);
    
    const manejarCambio = (event) => {
        const {name, value} = event.target;
        console.log(`Campo: ${name}, Valor: ${value}`);
        setDatosForm({ ...datosForm, [name]: value });
    };
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!imagenFile) {
            console.error('Por favor, selecciona una imagen.');
            return;
        }
        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = "a9d661655892ef04c32a8b1e23936c6d"; // Asegúrate de tener la variable de entorno configurada
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log('Subiendo imagen a Imgbb...');
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            const datosImgbb = await response.json();
            console.log('Imagen subida:', datosImgbb);
            if (datosImgbb.success) {
                console.log('Imagen lista!');
            // Aca se puede procesar los datos según las necesidades.
                const productoCompleto = {
                    ...datosForm,
                    urlImagen: datosImgbb.data.url
                };
                console.log('Producto completo:', productoCompleto);
            } else {
                throw new Error('Error al subir la imagen a Imgbb');
            }

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen. Por favor, intenta nuevamente.');
        }
        
    };

    return (
        <FormularioProductos 
            datosForm={datosForm} 
            manejarCambio={manejarCambio} 
            manejarEnvio={manejarEnvio} 
            manejarCambioImagen={manejarCambioImagen}
        />
    );

}