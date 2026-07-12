import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario logueado:', user);
                alert('¡Inicio de sesión exitoso!');
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error en el login:', errorCode, errorMessage);
                alert('Error: ' + errorMessage);
            });
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Iniciar sesión</h2>
                    <p className="mt-2 text-sm text-slate-500">Ingresá con tu correo para continuar comprando.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Correo electrónico</label>
                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Ingresar
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    ¿No tenés una cuenta?{' '}
                    <Link to="/registro" className="font-medium text-blue-600 hover:underline">
                        Registrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;