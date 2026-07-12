import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

export function Layout({ children }) {
    return (
        <div className="app-shell flex min-h-screen flex-col bg-slate-50 text-slate-800">
            <Header />
            <Navbar />
            <main className="flex-1 w-full">
                {children}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}