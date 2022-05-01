import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateFood from './components/CreateFood';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path= '/recipes' component={Home}/>
        <Route path= '/recipe' component={CreateFood}/>
        <Route path= '/recipes/:id' component={Detail}/>
      </Switch>
      
    </div> 
    </BrowserRouter>
  );
}

export default App;
