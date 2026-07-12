import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

export function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
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