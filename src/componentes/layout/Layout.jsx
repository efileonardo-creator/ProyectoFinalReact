import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemListContainer from '../item/ItemListContainer.jsx';
import ContenedorListaPersona from '../staff/ContenedorListaPersona.jsx';

export function Layout({ children }) {
    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Header />
            {children}
            <ItemListContainer />
            <ContenedorListaPersona />
            <Footer />
        </div>
    );
}