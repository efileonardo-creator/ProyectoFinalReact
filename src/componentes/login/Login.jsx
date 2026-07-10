import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
    const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario logueado:", user);
            alert("¡Inicio de sesión exitoso!");
            navigate('/'); //
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error en el login:", errorCode, errorMessage);
            alert("Error: " + errorMessage);
        });
    };
return (
    <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
            <input className= "invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
            type="email"

            placeholder="Correo electrónico"

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password"

            placeholder="Contraseña"
            value={password}

            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Ingresar</button>
        </form>
        {/*por si el usuario no tiene cuenta, lo redirigimos a la página de registro*/}
        <p>¿No tenés una cuenta? <Link to="/registro" className="text-blue-500 hover:underline">Registrate aquí</Link></p>
    </div>
    );
}

export default Login;