function Footer() {
    return (
        <footer className="mt-auto w-full border-t border-slate-200 bg-slate-900 px-6 py-6 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm md:flex-row md:text-left">
                <p>© 2026 - MiTiendita. Todos los derechos reservados.</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a href="/ProductosNacionales" className="transition hover:text-blue-300">
                        Productos
                    </a>
                    <a href="/login" className="transition hover:text-blue-300">
                        Ingresar
                    </a>
                    <a href="/Contacto" className="transition hover:text-blue-300">
                        Contacto
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
