import ListaPersona from './ListaPersona.jsx';
import { useState, useEffect } from 'react';

export function ContenedorListaPersona() {

    const [persona, setPersona] = useState([]);
    useEffect(() => {
        fetch('/data/nosotros.json')
            .then(respuesta => respuesta.json())
            .then(persona => setPersona(persona))
            .catch(error => console.error('¡Ups! Hubo un error:', error));
    }, []);

    return (
        <div>
            <h2 className='flex justify-center'>Staff</h2>
            <ListaPersona persona={persona} />
        </div>
    );
}