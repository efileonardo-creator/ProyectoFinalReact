import { Layout } from './componentes/layout/Layout.jsx';
import './App.css';
import {FormularioContainer} from './componentes/formularioProductos/FormularioContainer.jsx';  


function App() {


  return (
    <>
        <Layout>
            <h1 className="text-2xl text-green-500 font-bold">Bienvenido a mi tienda online</h1>
            <FormularioContainer />
        </Layout>
    </>
    )
    
}

export default App;
