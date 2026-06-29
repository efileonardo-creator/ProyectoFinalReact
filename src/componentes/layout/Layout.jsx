import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemListContainer from '../item/ItemListContainer.jsx';

export function Layout({ children }) {
    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />
            {children}
            <ItemListContainer />
            <Footer />
        </div>
    );
}