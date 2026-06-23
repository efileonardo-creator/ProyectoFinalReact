import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ItemListContainer from '../item/ItemListContainer.jsx';

export function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <ItemListContainer />
            <Footer />
        </div>
    );
}