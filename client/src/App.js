import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Boton from './components/Boton'
import Recipes from './components/Recipes'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/'>
        <h1>Henry Food</h1>
        <h2>¡Bienvenidos a la pagina de recetas!</h2>
        <Boton/>
      </Route>
      <Route path='/recipes'>
        <Recipes></Recipes>
      </Route>
      
    </div> 
    </BrowserRouter>
  );
}

export default App;
