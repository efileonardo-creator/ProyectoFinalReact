export default function Persona({ nombre, email, puesto, imagen }) {
    return (
        <div className='flex flex-col items-center border p-4 m-2'>
            <h3>{nombre}</h3>
            <img src={imagen} alt={nombre} className='w-32 h-32 object-cover' />
            <p>Email: {email}</p>
            <p>Puesto: {puesto}</p>
        </div>
    );
}