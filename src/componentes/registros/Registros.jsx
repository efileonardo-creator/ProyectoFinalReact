import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm('Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?');
                if (quiereLoguearse) {
                    navigate('/login');
                } else {
                    navigate('/');
                }
            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error('Error en el registro:', error.message);
            }
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Crear una cuenta</h2>
                    <p className="mt-2 text-sm text-slate-500">Completá tus datos y empezá a disfrutar de la tienda.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Ingrese su correo electrónico"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Mínimo 6 caracteres"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-slate-800 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registro;