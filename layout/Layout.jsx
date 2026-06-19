import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

export function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}