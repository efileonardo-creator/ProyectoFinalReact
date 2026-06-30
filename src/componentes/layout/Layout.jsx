import Header from './Header.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import {Outlet} from 'react-router-dom';

export function Layout({ children }) {
    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />
            <Navbar />
            {children}
            <Outlet />
            <Footer />
        </div>
    );
}