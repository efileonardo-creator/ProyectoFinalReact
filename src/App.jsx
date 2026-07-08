import { Layout } from './componentes/layout/Layout.jsx';
import './App.css';
import {FormularioContainer} from './componentes/formularioProductos/FormularioContainer.jsx'; 
import Carrito from './componentes/carrito/Carrito.jsx';
import {Routes, Route} from 'react-router-dom';
import {ContenedorListaPersona} from './componentes/staff/ContenedorListaPersona.jsx';
import ProductosNacionales from './componentes/productosNacionales/ProductosNacionales.jsx';  
import ProductosNacionalesDetalle from './componentes/productosNacionales/ProductosNacionalesDetalle.jsx';
import Login from './componentes/login/Login.jsx';
import Registro from './componentes/registros/Registros.jsx';
import RutaProtegidas from './componentes/rutasProtegidas/RutasProtegidas.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

function App() {


    return (
        <SearchProvider>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element="Inicio" Mensaje={"Inicio"}/>
                    <Route path='/Carrito' element={<Carrito/>} Mensaje={"Carrito de compras"}/>
                    
                    <Route path='/AltaProducto' element={
                        <RutaProtegidas rolesPermitidos={['admin']}>
                            <FormularioContainer/> Mensaje={"Alta de producto"}   
                        </RutaProtegidas>
                    }/>

                    <Route path='/ProductosNacionales' element={<ProductosNacionales/>} Mensaje={"Productos Nacionales"}/>
                    <Route path='/ProductosNacionales/:id' element={<ProductosNacionalesDetalle/>} Mensaje={"Productos Nacionales"}/>
                    <Route path='/Contacto' element={<ContenedorListaPersona/>} Mensaje={"Alta de producto"}/>
                    <Route path='/login' element={<Login/>} Mensaje={"Login"}/>   
                    <Route path='/registro' element={<Registro/>} Mensaje={"Registro"}/>   
                    </Route>
            </Routes>
        </SearchProvider>
        );

}

export default App;
