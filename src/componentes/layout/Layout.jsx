import Header from './Header.jsx';
import Footer from './Footer.jsx';

export function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}