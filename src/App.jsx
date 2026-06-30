import { Layout } from './componentes/layout/Layout.jsx';
import './App.css';
import {FormularioContainer} from './componentes/formularioProductos/FormularioContainer.jsx'; 
import {ItemListContainer} from './componentes/item/ItemListContainer.jsx';
import {Carrito} from './componentes/carrito/Carrito.jsx';
import {Routes, Route} from 'react-router-dom';
import {ContenedorListaPersona} from './componentes/staff/ContenedorListaPersona.jsx';
import { DetalleProducto } from './componentes/detalleProducto/DetalleProducto.jsx';

function App() {


    return (
        <Routes>{}
            <Route element={<Layout/>}>
                <Route path='/' element="Inicio" Mensaje={"Inicio"}/>
                <Route path='/Productos' element={<ItemListContainer/>} Mensaje={"Catálogo de productos"}/>
                <Route path='/Productos/:id' element={<DetalleProducto/>} Mensaje={"Detalle de producto"}/>
                <Route path='/Carrito' element={<Carrito/>} Mensaje={"Carrito de compras"}/>
                <Route path='/AltaProducto' element={<FormularioContainer/>} Mensaje={"Alta de producto"}/>    
                <Route path='/Contacto' element={<ContenedorListaPersona/>} Mensaje={"Alta de producto"}/>   
            </Route>
        </Routes>
        );

}

export default App;
