function Footer() {
    return (
        <footer className="mt-auto w-full bg-slate-800 px-6 py-4 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center text-sm md:flex-row md:text-left">
                <p>© 2026 - Mi aplicación React. Todos los derechos reservados.</p>
                <div className="flex gap-4">
                    <a href="/ProductosNacionales" className="transition hover:text-blue-300">
                        Productos
                    </a>
                    <a href="/login" className="transition hover:text-blue-300">
                        Ingresar
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
