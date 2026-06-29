import Persona from './Persona.jsx';

export default function ListaPersona({persona}) {
    return (
        <div className='flex flex-wrap justify-center'>
            {persona.map(person => (
            <Persona key={person.id} {...person} />
            ))}
        </div>
    );
}