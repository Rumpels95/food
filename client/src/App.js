import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Recipes from './components/Recipes'
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path= '/recipes' component={Home}/>
        <Route path='/recipes'>
          <Recipes></Recipes>
        </Route>
      </Switch>
      
    </div> 
    </BrowserRouter>
  );
}

export default App;
