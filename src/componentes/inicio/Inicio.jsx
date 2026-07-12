import { Link } from 'react-router-dom';

export function Inicio() {
    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 lg:px-6 lg:py-10">
            <section className="hero-glow overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-8 text-white shadow-xl md:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Nueva experiencia de compra</p>
                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Encontrá lo que necesitás con una compra rápida y sencilla.</h2>
                        <p className="mt-4 text-base text-blue-50 sm:text-lg">
                            Explorá productos seleccionados, agregá al carrito en segundos y disfrutá de una experiencia de compra clara desde el primer clic.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link to="/ProductosNacionales" className="btn-primary rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">
                            Ver productos
                        </Link>
                        <Link to="/registro" className="btn-secondary rounded-full px-5 py-3 text-sm font-semibold text-slate-700 transition hover:scale-[1.02]">
                            Crear cuenta
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { title: 'Envíos ágiles', text: 'Recepción rápida y seguimiento claro de cada pedido.' },
                    { title: 'Pago seguro', text: 'Una experiencia confiable para comprar con tranquilidad.' },
                    { title: 'Atención cercana', text: 'Te acompañamos en cada paso para que compres sin complicaciones.' },
                ].map((item) => (
                    <article key={item.title} className="soft-card rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="text-lg font-semibold text-slate-800">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}