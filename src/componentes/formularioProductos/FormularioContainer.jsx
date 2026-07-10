import { useEffect, useState } from 'react';
import { FormularioProductos } from './FormularioProductos.jsx';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const formInicial = {
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    descripcion: '',
    imagen: ''
};

export function FormularioContainer({ productoEditando = null, onProductoGuardado = () => {}, onCancelEdit = () => {} }) {
    const [datosForm, setDatosForm] = useState(formInicial);
    const [imagenFile, setImagenFile] = useState(null);

    useEffect(() => {
        if (productoEditando) {
            setDatosForm({
                nombre: productoEditando.nombre || '',
                precio: productoEditando.precio ?? '',
                stock: productoEditando.stock ?? '',
                categoria: productoEditando.categoria || '',
                descripcion: productoEditando.descripcion || '',
                imagen: productoEditando.imagen || ''
            });
        } else {
            setDatosForm(formInicial);
        }
    }, [productoEditando]);

    const manejarCambio = (event) => {
        const { name, value } = event.target;
        setDatosForm({ ...datosForm, [name]: value });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!datosForm.nombre || !datosForm.categoria || !datosForm.precio || !datosForm.stock) {
            alert('Completá nombre, categoría, precio y stock para continuar.');
            return;
        }

        try {
            let urlImagen = productoEditando?.imagen || '';

            if (imagenFile) {
                const apiKey = 'a9d661655892ef04c32a8b1e23936c6d';
                const formData = new FormData();
                formData.append('image', imagenFile);

                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });
                const datosImgbb = await response.json();

                if (!datosImgbb.success || !datosImgbb.data?.url) {
                    throw new Error('Error al subir la imagen a Imgbb');
                }

                urlImagen = datosImgbb.data.url;
            } else if (!urlImagen) {
                alert('Por favor, seleccioná una imagen o usá la actual.');
                return;
            }

            const productoCompleto = {
                ...datosForm,
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                imagen: urlImagen
            };

            const db = getFirestore();

            if (productoEditando?.id) {
                await updateDoc(doc(db, 'productos', productoEditando.id), productoCompleto);
            } else {
                await addDoc(collection(db, 'productos'), productoCompleto);
            }

            setDatosForm(formInicial);
            setImagenFile(null);
            onProductoGuardado();
            onCancelEdit();
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert('Ocurrió un error al guardar el producto.');
        }
    };

    return (
        <FormularioProductos
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            isEditing={Boolean(productoEditando)}
            onCancel={onCancelEdit}
        />
    );
}